import getUA, { getRandomUserAgent } from "@/utils/getUA";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { category, type, count } = await request.json();
  const availableCategory = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
    "trap",
    "blowjob",
  ];
  const availableType = ["sfw", "nsfw"];
  const availableCounts = ["1", "2", "3", "4", "5"];
  let error = false;
  let message = "";
  let status = 200;

  if (!category || !type || !count) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (count && !availableCounts.includes(count)) {
    error = true;
    message = "Count must be 1, 5, 10, 15, 20, 25, or 30.";
    status = 400;
  }
  if (category && !availableCategory.includes(category)) {
    error = true;
    message = "Invalid categories.";
    status = 400;
  }
  if (type && !availableType.includes(type)) {
    error = true;
    message = "Invalid type.";
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

  let link = null;
  if (count === 1) {
    const response = await fetch(`https://api.waifu.pics/${type}/${category}`);
    if (response.ok) {
      const data = await response.json();
      link = data.url;
    }
  } else {
    const response = await fetch(`https://api.waifu.pics/many/${type}/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": getRandomUserAgent(getUA()) },
      body: JSON.stringify({ exclude: [] }),
    });
    if (response.ok) {
      const data = await response.json();
      link = data.files.slice(0, count);
    }
  }

  return NextResponse.json(
    {
      success: true,
      message: "Gacha Waifu successfully.",
      totalData: link.length,
      data: link,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Gacha Waifu" }, { status: 200 });
}
