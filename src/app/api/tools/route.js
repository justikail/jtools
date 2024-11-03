import { supabase } from "@/libs/supbase";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("short");

  let toolsQuery = supabase.from("tools");
  let message = "Tools fetched successfully!";

  if (query === "news") {
    toolsQuery = toolsQuery.select("name, link").eq("isActive", true).order("createdAt", { ascending: false }).limit(5);
    message = "News Tools fetched successfully!";
  } else if (query === "broke") {
    toolsQuery = toolsQuery.select("*").eq("isActive", false);
    message = "Broken Tools fetched successfully!";
  } else {
    toolsQuery = toolsQuery.select("*");
  }

  const { data: tools, error } = await toolsQuery;
  const { count } = await supabase.from("tools").select("*", { count: "exact" });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something wrong while fetching tools",
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message,
      totalData: count,
      data: tools,
    },
    { status: 200 }
  );
}
