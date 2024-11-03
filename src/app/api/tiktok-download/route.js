import getUA, { getRandomUserAgent } from "@/utils/getUA";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { url } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!url) {
    error = true;
    message = "All fields are required";
    status = 400;
  }
  if (
    url &&
    !url.trim().startsWith("http://tiktok.com/") &&
    !url.trim().startsWith("https://tiktok.com/") &&
    !url.trim().startsWith("http://www.tiktok.com/") &&
    !url.trim().startsWith("https://www.tiktok.com/") &&
    !url.trim().startsWith("https://vt.tiktok.com/") &&
    !url.trim().startsWith("http://vt.tiktok.com/")
  ) {
    error = true;
    message = "Invalid TikTok URL";
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

  const response = await fetch(`https://api.ryzendesu.vip/api/downloader/ttdl?url=${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": getRandomUserAgent(getUA()),
    },
  });
  const data = await response.json();
  if (data.msg == "success") {
    return NextResponse.json(
      {
        success: true,
        message: "Scrape data successfully",
        totalData: data.length,
        data: data.data,
      },
      { status }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        error: "TikTok Data Not Found.",
      },
      {
        status: 404,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "Tiktok Downloader" }, { status: 200 });
}
