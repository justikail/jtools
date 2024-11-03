import { supabase } from "@/libs/supbase";
import getUA, { getRandomUserAgent } from "@/utils/getUA";
import { NextResponse } from "next/server";

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([fetch(url, options), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout))]);
};

export async function POST(request) {
  const { webshell, title } = await request.json();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
  ];
  const userAgents = getUA();

  let error = false;
  let message = "";
  let status = 200;
  if (!allowedOrigins.includes(origin)) {
    error = true;
    message = "Forbidden";
    status = 403;
  }
  if (!webshell || !title) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (!Array.isArray(webshell)) {
    error = true;
    message = "Webshell must be an array.";
    status = 400;
  }

  const results = await Promise.all(
    webshell.map(async (shell) => {
      const link = shell.startsWith("https://") || shell.startsWith("http://") ? shell : `http://${shell}`;
      try {
        const response = await fetchWithTimeout(link, {
          headers: { "User-Agent": getRandomUserAgent(userAgents) },
        });
        const html = await response.text();
        const titleFound = html.includes(`<title>${title}</title>`) || html.includes(title);
        if (titleFound) {
          const status = ["Timeout", "Failed"].includes(response.status) ? "IDK" : titleFound ? "LIVE" : "DIE" || response.status !== 200 ? "DIE" : "LIVE";
          await supabase.from("webshell").insert([{ shell: link, status }]);
        }
        return { link, status: response.status, titleFound };
      } catch (error) {
        return { link, status: error.message === "Timeout" ? "Timeout" : "Failed", titleFound: false };
      }
    })
  );

  if (error) {
    return NextResponse.json(
      {
        success: true,
        error: message,
      },
      { status }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Check complete.",
      data: results,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Webshell Checker" }, { status: 200 });
}
