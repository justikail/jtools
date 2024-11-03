import { NextResponse } from "next/server";

export async function POST(request) {
  const { script } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!script) {
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

  const generateOutput = (script) => {
    let output = "";
    for (let i = 0; i < script.length; ++i) {
      if (output !== "") output += ", ";
      output += script.charCodeAt(i);
    }
    return output;
  };

  const output = generateOutput(script);
  const paste = `document.documentElement.innerHTML=String.fromCharCode(${output});`;
  const inputPaste = await fetch("https://pastein.vercel.app/api/pastes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Untitled", content: paste, type: "text", situation: "insert", endPoint: null, expiredIn: null }),
  });
  const res = await inputPaste.json();

  return NextResponse.json(
    {
      success: true,
      message: "Generate JSO Successfully.",
      totalData: res.length,
      data: `https://pastein.vercel.app/api/raw?q=${res.endPoint}`,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "JSO Generator" }, { status: 200 });
}
