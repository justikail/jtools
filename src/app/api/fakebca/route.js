import { NextResponse } from "next/server";

export async function POST(request) {
  const { norek, saldo } = await request.json();
  let error = false;
  let status = 200;
  let message = "";

  if (!norek || !saldo) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (!Number.isInteger(norek) || !Number.isInteger(saldo)) {
    error = true;
    message = "No. Rek and Saldo must be a number.";
    status = 400;
  }
  if (norek <= 0 || saldo <= 0) {
    error = true;
    message = "No. Rek and Saldo must be greater than 0.";
    status = 400;
  }

  if (error) {
    return NextResponse.json({ success: false, error: message }, { status });
  }

  try {
    const response = await fetch(`https://pitucode.com/downloader/bca/7?apikey=${process.env.NEXT_PUBLIC_APIKEY_EXTERNAL1}&rek=${norek}&saldo=${saldo}`);
    const data = await response.json();

    if (response.ok && data.result?.url) {
      const imageResponse = await fetch(data.result.url);
      const imageBlob = await imageResponse.blob();

      const arrayBuffer = await imageBlob.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        headers: {
          "Content-Type": imageResponse.headers.get("Content-Type") || "application/octet-stream",
        },
        status: 200,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong while generating screenshot.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Unknown error ${error}.`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "Fake Saldo BCA Generator" }, { status: 200 });
}
