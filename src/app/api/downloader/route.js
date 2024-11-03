import { NextResponse } from "next/server";
import getUA, { getRandomUserAgent } from "@/utils/getUA";

export async function GET(request) {
  const url = new URL(request.url);
  const source = url.searchParams.get("s");
  const title = url.searchParams.get("t");
  const ext = url.searchParams.get("e");

  if (source) {
    try {
      const response = await fetch(source, {
        method: "GET",
        responseType: "stream",
        headers: {
          "User-Agent": getRandomUserAgent(getUA()),
        },
      });
      const headers = {
        "Content-Type": response.headers["content-type"] || "application/octet-stream",
        "Content-Disposition": `attachment; filename=${title || "Download"}.${ext || "txt"}`,
      };

      return new Response(response.body, {
        headers,
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Something wrong while downloading",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ tools: "Downloader" }, { status: 200 });
}
