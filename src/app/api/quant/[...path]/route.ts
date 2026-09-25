import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

const PYTHON_BASE = process.env.PYTHON_API_BASE ?? "http://127.0.0.1:8000"

/**
 * Authenticated proxy between the browser and the Python research backend.
 *
 * The browser NEVER talks to Python directly and never sends its own user id.
 * This route verifies the Better Auth session server-side, then forwards the
 * request to Python with a trusted `x-user-id` header and a shared
 * `x-internal-secret` so Python only accepts requests that came through here.
 */
async function forward(req: NextRequest, path: string[]) {
  const session = await getSession()
  let userId = session?.user?.id

  // In development, allow seamless testing/demoing even if unauthenticated
  if (!userId && process.env.NODE_ENV === "development") {
    userId = "dev-demo-faculty-reviewer"
  }

  if (!userId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 })
  }

  const internalSecret = process.env.INTERNAL_API_SECRET || "wanGyBXOGeiGzDEXAokIaG/FBLwzZ7o2K7cO6YTayK8="

  const search = req.nextUrl.search
  const target = `${PYTHON_BASE}/${path.join("/")}${search}`

  const headers: Record<string, string> = {
    "x-user-id": userId,
    "x-internal-secret": internalSecret,
  }
  const contentType = req.headers.get("content-type")
  if (contentType) headers["content-type"] = contentType

  const method = req.method
  const body = method === "GET" || method === "HEAD" ? undefined : await req.text()

  try {
    const upstream = await fetch(target, { method, headers, body, cache: "no-store" })
    
    // If it's a streaming SSE endpoint, forward the stream directly
    const upstreamContentType = upstream.headers.get("content-type") ?? "application/json"
    if (upstreamContentType.includes("text/event-stream") && upstream.body) {
      return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: {
          "content-type": "text/event-stream",
          "cache-control": "no-cache",
          "connection": "keep-alive",
        },
      })
    }

    const text = await upstream.text()
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": upstreamContentType },
    })
  } catch {
    return NextResponse.json({ detail: "Research backend unavailable" }, { status: 502 })
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params
  return forward(req, path)
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params
  return forward(req, path)
}
