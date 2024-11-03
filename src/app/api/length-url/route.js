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
  if (!url.trim().startsWith("http://") && !url.trim().startsWith("https://")) {
    error = true;
    message = "Invalid URL";
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

  const response = await fetch(`https://torch-wax-borogovia.glitch.me/lengthen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  const data = await response.json();

  return NextResponse.json(
    {
      success: true,
      message: "URL Lengthened successfully",
      totalData: data.length,
      data: `https://torch-wax-borogovia.glitch.me/${data.shortUrl}`,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Url Lengthener" }, { status: 200 });
}
