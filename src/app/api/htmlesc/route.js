import { NextResponse } from "next/server";

export async function POST(request) {
  const { code } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!code) {
    error = true;
    message = "All fields are required";
    status = 400;
  }

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status }
    );
  }

  const generateEscape = (code) => {
    let output = "";
    for (let i = 0; i < code.length; ++i) {
      output += "%" + code.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return output;
  };
  const template = `<script>document.write(unescape('${generateEscape(code)}'));</script>`;

  return NextResponse.json({
    success: true,
    message: "Code escaped successfully",
    totalData: template.length,
    data: template,
  });
}

export async function GET() {
  return NextResponse.json({ tools: "HTML Escaper" }, { status: 200 });
}
