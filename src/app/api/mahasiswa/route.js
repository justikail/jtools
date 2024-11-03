import { NextResponse } from "next/server";

export async function POST(request) {
  const { search, option } = await request.json();
  if (!search || !option) {
    return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
  }
  if (option && !["1", "2"].includes(option)) {
    return NextResponse.json({ success: false, error: "Invalid option." }, { status: 400 });
  }

  let pddiktiLink;
  switch (option) {
    case "1":
      pddiktiLink = "https://pddikti.kemdikbud.go.id/api/pencarian/mhs/";
      break;
    case "2":
      pddiktiLink = "https://pddikti.kemdikbud.go.id/api/pencarian/dosen/";
      break;
  }

  try {
    const response = await fetch(`${pddiktiLink}${search}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "3ed297db-db1c-4266-8bf4-a89f21c01317",
      },
    });
    const data = await response.json();
    if (data) {
      return NextResponse.json(
        {
          success: true,
          message: "Mahasiswa and Dosen fetched successfully!",
          totalData: data ? data.length : null,
          data: {
            option,
            list: data,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Data tidak ditemukan.",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ tools: "Cari Mahasiswa & Dosen" }, { status: 200 });
}
