# 🔄 Backend Restart Instructions

## ⚠️ CRITICAL: Your backend is running OLD code!

The 404 error on `/api/v1/signals/validate` happens because your Python backend process loaded code **before** the validation endpoint was added.

---

## 🛑 Step 1: Stop the Backend

In the terminal running `python backend/main.py`, press:

```
Ctrl + C
```

Wait until you see the process stopped.

---

## ▶️ Step 2: Restart the Backend

**Option A: Using the batch file**
```bash
START_BACKEND.bat
```

**Option B: Manual command**
```bash
cd c:\Users\dhruv\QuantAlpha
python backend/main.py
```

---

## ✅ Step 3: Verify Backend is Ready

You should see in the terminal:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

---

## 🧪 Step 4: Test Validation

1. Open frontend: http://localhost:3000/research
2. Click **"Inspect"** on any signal (e.g., MOM_CROSS_V4)
3. Click **"Run Purged K-Fold Validation"**
4. Watch the backend terminal - you should see:
   ```
   INFO:validation_engine:Generated 5 purged K-fold splits
   INFO:validation_engine:CPCV: 10 paths from 5 folds
   INFO:validation_engine:PBO: 0.12
   INFO:validation_engine:DSR: 0.96
   ```

5. If validation passes (PBO ≤ 0.5, DSR > 0.95), the signal will:
   - Disappear from "Candidate Signals"
   - Appear in "Validated Signals" with green checkmark

---

## 🐛 If Still Getting 404:

1. Check backend terminal for startup errors
2. Verify the URL in browser network tab: `http://localhost:8000/api/v1/signals/validate`
3. Check that frontend is calling correct URL in `src/services/quantApi.ts`
4. Try `http://localhost:8000/api/v1/health` in browser - should return JSON

---

## 📊 Expected Backend Logs During Validation:

```
INFO:validation_engine:Starting validation pipeline with 1234 samples
INFO:validation_engine:Generated 5 purged K-fold splits
INFO:validation_engine:CPCV: 10 paths from 5 folds
INFO:validation_engine:Running PBO analysis with 50 random trials
INFO:validation_engine:PBO: 0.12 (PASSED: < 0.50)
INFO:validation_engine:DSR: 0.96 (PASSED: > 0.95)
INFO:validation_engine:Validation Status: PASSED
INFO:     127.0.0.1:xxxxx - "POST /api/v1/signals/validate HTTP/1.1" 200 OK
```

---

## 🎯 What Should Happen After Restart:

✅ Backend loads NEW code with validation endpoint  
✅ POST /api/v1/signals/validate → 200 OK (not 404)  
✅ Real CPCV, PBO, DSR calculations execute  
✅ Signals graduate based on REAL validation math  
✅ You can show judges REAL industrial validation

---

## 💡 Pro Tip:

The backend runs with `reload=True` in main.py line 414:
```python
uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
```

This means it *should* auto-reload on code changes, but sometimes Python caching causes issues. When in doubt, manually restart!
