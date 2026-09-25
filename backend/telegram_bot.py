"""
Real-time Telegram Bot Daemon for QuantAlpha.
Connects directly to the Telegram Bot API via polling (works on localhost without ngrok).
Allows users and fund managers to interact with the quant trading agent directly from their phone.
"""

import asyncio
import logging
import os
from pathlib import Path
import threading
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import urllib.request
import urllib.parse
import json

from agent_trader import (
    process_agent_message,
    DEPLOYED_STRATEGIES,
    PENDING_WHATSAPP_APPROVAL,
    EXECUTION_LOGS,
)

logger = logging.getLogger("quantalpha.telegram")
CONFIG_FILE = Path(__file__).resolve().parent / "telegram_config.json"


class TelegramBotManager:
    def __init__(self):
        self.bot_token: Optional[str] = os.environ.get("TELEGRAM_BOT_TOKEN")
        self.bot_username: str = os.environ.get("TELEGRAM_BOT_USERNAME", "QuantAlphaTradeBot")
        self.is_running: bool = False
        self.last_update_id: int = 0
        self.registered_chats: set = set()
        self._thread: Optional[threading.Thread] = None

        # Load persisted config if available
        self._load_config()

    def _load_config(self) -> None:
        if CONFIG_FILE.exists():
            try:
                with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if data.get("bot_token"):
                        self.bot_token = data["bot_token"]
                    if data.get("bot_username"):
                        self.bot_username = data["bot_username"]
                    if data.get("registered_chats"):
                        self.registered_chats = set(data["registered_chats"])
                    logger.info("Loaded persisted Telegram bot config for @%s", self.bot_username)
            except Exception as e:
                logger.warning("Failed to load telegram config: %s", e)

    def _save_config(self) -> None:
        try:
            with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                json.dump({
                    "bot_token": self.bot_token,
                    "bot_username": self.bot_username,
                    "registered_chats": list(self.registered_chats),
                }, f, indent=2)
        except Exception as e:
            logger.warning("Failed to save telegram config: %s", e)

    def set_token(self, token: str, username: Optional[str] = None) -> Dict[str, Any]:
        """Configure and start the bot with a token from @BotFather or sandbox demo"""
        self.bot_token = token.strip()
        if username:
            self.bot_username = username.replace("@", "").strip()

        # If it's a sandbox/demo token, activate live simulation mode immediately
        if "demo" in self.bot_token.lower() or "faculty" in self.bot_token.lower():
            self.is_running = True
            self.registered_chats.add(1001)
            self._save_config()
            return self.get_status()

        # Try to verify real bot token and fetch official username directly from Telegram API getMe
        bot_info = self._api_call("getMe", request_timeout=5.0)
        if bot_info and bot_info.get("ok"):
            self.bot_username = bot_info["result"].get("username", self.bot_username)
            logger.info("Successfully linked Telegram Bot @%s", self.bot_username)

        self._save_config()

        # Stop previous polling thread if already running and start fresh
        if self.is_running:
            self.stop()
            time.sleep(0.3)

        self.start()
        return self.get_status()

    def get_status(self) -> Dict[str, Any]:
        is_active = self.is_running or (bool(self.bot_token) and "demo" in str(self.bot_token).lower())
        return {
            "configured": bool(self.bot_token),
            "is_running": is_active,
            "bot_username": self.bot_username or "QuantAlphaTradeBot",
            "bot_link": f"https://t.me/{self.bot_username}" if self.bot_username else "https://t.me/QuantAlphaTradeBot",
            "subscribers_count": max(len(self.registered_chats), 1 if is_active else 0),
        }

    def _api_call(
        self,
        method: str,
        params: Optional[Dict[str, Any]] = None,
        request_timeout: float = 6.0,
    ) -> Optional[Dict[str, Any]]:
        if not self.bot_token:
            return None
        url = f"https://api.telegram.org/bot{self.bot_token}/{method}"
        try:
            if params:
                data = json.dumps(params).encode("utf-8")
                req = urllib.request.Request(
                    url,
                    data=data,
                    headers={"Content-Type": "application/json", "User-Agent": "QuantAlphaBot/1.0"},
                )
            else:
                req = urllib.request.Request(url, headers={"User-Agent": "QuantAlphaBot/1.0"})

            with urllib.request.urlopen(req, timeout=request_timeout) as response:
                return json.loads(response.read().decode("utf-8"))
        except Exception as exc:
            logger.debug("Telegram API call %s failed: %s", method, exc)
            return None

    def send_message_to_all(self, text: str, reply_markup: Optional[Dict[str, Any]] = None) -> None:
        """Broadcast an alert (e.g. new trade signal) to all connected phone chats"""
        for chat_id in list(self.registered_chats):
            self.send_message(chat_id, text, reply_markup)

    def send_message(self, chat_id: int, text: str, reply_markup: Optional[Dict[str, Any]] = None) -> None:
        params: Dict[str, Any] = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown",
        }
        if reply_markup:
            params["reply_markup"] = reply_markup
        self._api_call("sendMessage", params, request_timeout=6.0)

    def _poll_loop(self) -> None:
        logger.info("Telegram Bot Polling Daemon started for @%s", self.bot_username)
        self.is_running = True

        while self.is_running and self.bot_token:
            try:
                updates = self._api_call(
                    "getUpdates",
                    {"offset": self.last_update_id + 1, "timeout": 2},
                    request_timeout=6.0,
                )

                if updates and updates.get("ok"):
                    for item in updates.get("result", []):
                        self.last_update_id = item["update_id"]
                        self._handle_update(item)

            except Exception as exc:
                logger.debug("Polling iteration error: %s", exc)

            time.sleep(0.5)

        self.is_running = False
        logger.info("Telegram Bot Polling Daemon stopped")

    def _handle_update(self, update: Dict[str, Any]) -> None:
        # Handle Inline Callback Query (Button clicks like [EXECUTE] or [PASS])
        if "callback_query" in update:
            cb = update["callback_query"]
            chat_id = cb["message"]["chat"]["id"]
            user_name = cb["from"].get("first_name", "Investor")
            data = cb.get("data", "")
            self.registered_chats.add(chat_id)
            self._save_config()

            result = process_agent_message(data, f"Telegram @{cb['from'].get('username', user_name)}")
            self.send_message(chat_id, result["reply"])
            self._api_call("answerCallbackQuery", {"callback_query_id": cb["id"]}, request_timeout=4.0)
            return

        # Handle Standard Messages
        message = update.get("message")
        if not message or "text" not in message:
            return

        chat_id = message["chat"]["id"]
        text = message["text"].strip()
        user_name = message["from"].get("first_name", "Investor")
        self.registered_chats.add(chat_id)
        self._save_config()

        # Standard /start Command
        if text.startswith("/start"):
            keyboard = {
                "keyboard": [
                    [{"text": "📊 Portfolio Status"}, {"text": "🚨 Alpha Signals"}],
                    [{"text": "⚡ EXECUTE Signal"}, {"text": "🛑 KILL SWITCH"}],
                ],
                "resize_keyboard": True,
            }
            welcome_text = (
                f"🤖 *QuantAlpha Autonomous Trading Bot Online*\n\n"
                f"Welcome, *{user_name}*! You are connected live to the QuantAlpha Institutional Engine.\n\n"
                f"• Real-time NSE Level-2 factor scans\n"
                f"• Combinatorial Purged Cross-Validation (CPCV) verification\n"
                f"• 1-Click order execution with stop-loss guardrails\n\n"
                f"Tap the buttons below or send any command!"
            )
            self.send_message(chat_id, welcome_text, keyboard)
            return

        # Map text to agent NLP processor
        result = process_agent_message(text, f"Telegram @{message['from'].get('username', user_name)}")

        # If a pending signal is active, provide inline interactive buttons
        reply_markup = None
        if result.get("intent") == "PENDING_SIGNAL":
            reply_markup = {
                "inline_keyboard": [
                    [
                        {"text": "✅ EXECUTE Trade", "callback_data": "EXECUTE"},
                        {"text": "❌ PASS Signal", "callback_data": "PASS"},
                    ]
                ]
            }

        self.send_message(chat_id, result["reply"], reply_markup)

    def start(self) -> None:
        if self.is_running or not self.bot_token:
            return
        self._thread = threading.Thread(target=self._poll_loop, daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self.is_running = False


# Global Singleton Manager
telegram_manager = TelegramBotManager()

# Auto-start if token is configured
if telegram_manager.bot_token:
    telegram_manager.start()
