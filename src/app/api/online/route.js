import { NextResponse } from "next/server";
import { supabase } from "@/libs/supbase";

export async function POST(request) {
  const { ip, isOnline } = await request.json();

  const { error } = await supabase
    .from("visitors")
    .update({ isOnline: isOnline })
    .eq("ip_address", ip)
    .gte("visited_at", new Date().toISOString().split("T")[0] + "T00:00:00");

  if (error) {
    const res = {
      success: false,
      message: "Something wrong while updating status",
      error: error.message,
    };
    return NextResponse.json(res, { status: 500 });
  }

  const res = {
    success: true,
    message: "Status updated successfully!",
  };
  return NextResponse.json(res, { status: 200 });
}

export async function GET() {
  const { data, error } = await supabase.from("visitors").select("ip_address").eq("isOnline", true);

  if (error) {
    const res = {
      success: false,
      message: "Something wrong while fetching online visitors",
      error: error.message,
    };
    return NextResponse.json(res, { status: 500 });
  }

  const res = {
    success: true,
    message: "Online visitors fetched successfully!",
    totalData: data.length,
    data: data,
  };
  return NextResponse.json(res, { status: 200 });
}
