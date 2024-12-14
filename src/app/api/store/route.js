import { supabase } from "@/libs/supbase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("shop").select("*");

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something wrong while fetching product.",
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Fetching Product Successfully.",
      totalData: data.length,
      data,
    },
    { status: 200 }
  );
}
