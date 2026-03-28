import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const CHATBOT_API =  process.env.NEXT_PUBLIC_CHATBOT_API!;
const MAIN_API =  process.env.NEXT_PUBLIC_MAIN_API!;

const ACCESS_COOKIE = "access_token";
 
function getSetCookieArray(res: Response): string[] {
  const anyHeaders = res.headers as any;
 
  // Next/Node may expose getSetCookie()
  if (typeof anyHeaders.getSetCookie === "function") {
    return anyHeaders.getSetCookie() as string[];
  }

  const sc = res.headers.get("set-cookie");
  return sc ? [sc] : [];
}

function extractCookieValue(setCookie: string, name: string) {
  // name=value; Path=/; HttpOnly; ...
  const m = setCookie.match(new RegExp(`${name}=([^;]+)`));
  return m?.[1];
}

function cleanResponseHeaders(headers: Headers) {
  const h = new Headers(headers);
  h.delete("connection");
  h.delete("transfer-encoding");
  h.delete("content-length");
  return h;
}

function cleanRequestHeaders(headers: Headers) {
  const h = new Headers(headers);
  h.delete("cookie");         // chatbot cookie accept nahi karta
  h.delete("host");
  h.delete("content-length"); // body length change ho sakta hai
  return h;
}

async function callChatbot(
  req: NextRequest,
  bodyText: string | undefined,
  token?: string
) {
  const { pathname, search } = new URL(req.url);

  // "/api/chatbot/..." prefix remove karke chatbot api pe forward
  const path = pathname.replace(/^\/api\/chatbot\/?/, "");
  const targetUrl = `${CHATBOT_API}/${path}${search}`;

  const headers = cleanRequestHeaders(new Headers(req.headers));
  if (token) headers.set("authorization", `Bearer ${token}`);

  return fetch(targetUrl, {
    method: req.method,
    headers,
    body: bodyText,
  });
}

async function handler(req: NextRequest) {
  const bodyText =
    req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

  // Next 15+: cookies() async hai
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  // 1) first try
  let chatbotRes = await callChatbot(req, bodyText, accessToken);

  // 2) if chatbot says 401 -> refresh on MAIN backend -> retry once
  if (chatbotRes.status === 401) {
    const incomingCookieHeader = req.headers.get("cookie") ?? "";

    const refreshRes = await fetch(`${MAIN_API}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: incomingCookieHeader, // refresh token cookie MAIN backend ko jayegi
        "content-type": "application/json",
      },
      body: "{}",
    });

    if (!refreshRes.ok) {
      return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
    }

    const setCookies = getSetCookieArray(refreshRes);

    // refresh response ke Set-Cookie se naya access_token nikaalo
    let newAccessToken: string | undefined;
    for (const sc of setCookies) {
      const v = extractCookieValue(sc, ACCESS_COOKIE);
      if (v) {
        newAccessToken = v;
        break;
      }
    }

    if (!newAccessToken) {
      return NextResponse.json(
        { message: "Refresh ok but access_token not found in Set-Cookie" },
        { status: 401 }
      );
    }

    // retry chatbot call with new token
    chatbotRes = await callChatbot(req, bodyText, newAccessToken);

    // chatbot response + forward Set-Cookie back to browser
    const finalHeaders = cleanResponseHeaders(chatbotRes.headers);
    for (const sc of setCookies) finalHeaders.append("set-cookie", sc);

    return new NextResponse(chatbotRes.body, {
      status: chatbotRes.status,
      headers: finalHeaders,
    });
  }

  // normal response
  return new NextResponse(chatbotRes.body, {
    status: chatbotRes.status,
    headers: cleanResponseHeaders(chatbotRes.headers),
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;