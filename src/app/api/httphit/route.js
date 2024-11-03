import { NextResponse } from "next/server";

export async function POST(request) {
  const { url, method, headers, body } = await request.json();
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  let error = false;
  let message = "";
  let status = 200;

  if (!url || !method) {
    error = true;
    message = "All fields are required";
    status = 400;
  }
  if (!validMethods.includes(method)) {
    error = true;
    message = "Invalid method";
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

  const response = await fetch(url, {
    method,
    headers: headers.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {}),
    body: method !== "GET" ? body : null,
  });

  const data = await response.text();
  return NextResponse.json(
    {
      success: true,
      message: "Hit HTTP Successfully.",
      totalData: data.length,
      data: data,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "HTTP Hit" }, { status: 200 });
}
