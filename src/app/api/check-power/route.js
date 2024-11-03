import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

function getNameValue(name) {
  return name
    .toUpperCase()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0) - 64, 0);
}

function getUniqueItems(arr, startIndex, count) {
  const uniqueItems = [];
  const arrLength = arr.length;

  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % arrLength;
    uniqueItems.push(arr[index]);
  }

  return uniqueItems;
}

async function generatePowerAndSkill(name, gender) {
  const filePath = path.join(process.cwd(), "public", "assets", "power.json");

  const data = await fs.readFile(filePath, "utf8");
  const { powers, skills } = JSON.parse(data);

  const nameValue = getNameValue(name);

  const uniquePowers = getUniqueItems(powers, nameValue, 5);

  let startingIndex = (gender.charCodeAt(0) + name.length) % skills.length;
  const uniqueSkills = getUniqueItems(skills, startingIndex, 5);

  return {
    name,
    gender,
    powers: uniquePowers,
    skills: uniqueSkills,
  };
}

export async function POST(request) {
  const { nama, gender } = await request.json();
  let error = false;
  let message = "";
  let status = 200;

  if (!nama || !gender) {
    error = true;
    message = "All fields are required";
    status = 400;
  }
  if (nama && nama.length < 3) {
    error = true;
    message = "Name must be at least 3 characters";
    status = 400;
  }
  if (gender && !["L", "P"].includes(gender)) {
    error = true;
    message = "Gender must be male (L) or female (P)";
    status = 400;
  }
  if (error) {
    return NextResponse.json({ success: false, error: message }, { status });
  }

  const data = await generatePowerAndSkill(nama, gender);
  return NextResponse.json(
    {
      success: true,
      message: "Power and skill generated successfully",
      data,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Check Power" }, { status: 200 });
}
