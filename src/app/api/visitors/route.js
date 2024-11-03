import { NextResponse } from "next/server";
import { supabase } from "@/libs/supbase";

export async function POST(request) {
  const { ip } = await request.json();

  const { data: existingVisit, error: checkError } = await supabase.from("visitors").select("id").eq("ip_address", ip);

  if (checkError) {
    const res = {
      success: false,
      message: "Something wrong while checking visitor",
      error: checkError.message,
    };
    return NextResponse.json(res, { status: 500 });
  }

  if (existingVisit.length === 0) {
    const { error } = await supabase.from("visitors").insert([{ ip_address: ip, visited_at: new Date() }]);

    if (error) {
      const res = {
        success: false,
        message: "Something wrong while inserting visitor",
        error: error.message,
      };
      return NextResponse.json(res, { status: 500 });
    }
  }

  const res = {
    success: true,
    message: "Visit tracked successfully!",
  };
  return NextResponse.json(res, { status: 200 });
}

export async function GET() {
  const { data, error } = await supabase.from("visitors").select("*");

  if (error) {
    const res = {
      success: false,
      message: "Something wrong while fetching visitors",
      error: error.message,
    };
    return NextResponse.json(res, { status: 500 });
  }

  const res = {
    success: true,
    message: "Visitors fetched successfully!",
    totalData: data.length,
    data: data,
  };
  return NextResponse.json(res, { status: 200 });
}
