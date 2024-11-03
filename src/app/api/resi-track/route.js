import { NextResponse } from "next/server";

async function getData(courier, trackId) {
  const response = await fetch(`https://api.binderbyte.com/v1/track?api_key=f0bd37a008e9686ac642aaa1929ecfbf73bd9f9bc6db5d12a78e105fecc773a6&courier=${courier}&awb=${trackId}`);
  const data = await response.json();
  if (response.ok) {
    return data.data;
  } else {
    return data.message;
  }
}

export async function POST(request) {
  const { option, trackId } = await request.json();
  let error = false;
  let message = "";
  let status = 200;
  let result = null;

  if (!option || !trackId) {
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

  switch (option) {
    case "jne":
      result = await getData("jne", trackId);
      break;
    case "pos":
      result = await getData("pos", trackId);
      break;
    case "jnt":
      result = await getData("jnt", trackId);
      break;
    case "jnt_cargo":
      result = await getData("jnt_cargo", trackId);
      break;
    case "sicepat":
      result = await getData("sicepat", trackId);
      break;
    case "tiki":
      result = await getData("tiki", trackId);
      break;
    case "anteraja":
      result = await getData("anteraja", trackId);
      break;
    case "wahana":
      result = await getData("wahana", trackId);
      break;
    case "ninja":
      result = await getData("ninja", trackId);
      break;
    case "lion":
      result = await getData("lion", trackId);
      break;
    case "pcp":
      result = await getData("pcp", trackId);
      break;
    case "jet":
      result = await getData("jet", trackId);
      break;
    case "rex":
      result = await getData("rex", trackId);
      break;
    case "first":
      result = await getData("first", trackId);
      break;
    case "ide":
      result = await getData("ide", trackId);
      break;
    case "spx":
      result = await getData("spx", trackId);
      break;
    case "kgx":
      result = await getData("kgx", trackId);
      break;
    case "sap":
      result = await getData("sap", trackId);
      break;
    case "jx":
      result = await getData("jx", trackId);
      break;
    case "rpx":
      result = await getData("rpx", trackId);
      break;
    case "lzd":
      result = await getData("lzd", trackId);
      break;
    case "indah":
      result = await getData("indah", trackId);
      break;
    case "dakota":
      result = await getData("dakota", trackId);
      break;
    default:
      return NextResponse.json(
        {
          success: false,
          error: "Invalid option.",
        },
        { status: 400 }
      );
  }

  if (result.summary) {
    return NextResponse.json(
      {
        success: true,
        message: "Resi tracking successfully.",
        totalData: result.length,
        data: result,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        error: result,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "Resi Checker" }, { status: 200 });
}
