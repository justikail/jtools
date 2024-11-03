import { NextResponse } from "next/server";
import getAdminPaths from "@/utils/getAdminPaths";
import getUA, { getRandomUserAgent } from "@/utils/getUA";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([fetch(url, options), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout))]);
};

export async function POST(request) {
  const { target, customPaths } = await request.json();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
  ];
  const adminPaths = getAdminPaths();
  const userAgents = getUA();
  let error = false;
  let message = "";
  let status = 200;

  if (!allowedOrigins.includes(origin)) {
    error = true;
    message = "Forbidden.";
    status = 403;
  }
  if (!target) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (!Array.isArray(customPaths)) {
    error = true;
    message = "Custom paths must be an array.";
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

  const paths = (customPaths && customPaths.length < 0) || customPaths[0] == "" ? adminPaths : customPaths;

  const results = await Promise.all(
    paths.map(async (path) => {
      const link = target.startsWith("https://") || target.startsWith("http://") ? `${target}/${path}` : `http://${target}${path}`;
      try {
        const response = await fetchWithTimeout(link, {
          headers: { "User-Agent": getRandomUserAgent(userAgents) },
        });
        return { link, status: response.status };
      } catch (error) {
        return { link, status: error.message === "Timeout" ? "Timeout" : "Failed" };
      }
    })
  );

  return NextResponse.json(
    {
      success: true,
      message: "Find Admin Successfully",
      totalData: results.length,
      data: results,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Admin Finder" }, { status: 200 });
}
