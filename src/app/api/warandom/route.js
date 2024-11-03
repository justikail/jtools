import { NextResponse } from "next/server";

const alloperatorprefix = [
  "52",
  "53",
  "11",
  "12",
  "13",
  "21",
  "22",
  "23",
  "51",
  "55",
  "56",
  "57",
  "58",
  "11",
  "12",
  "14",
  "15",
  "16",
  "11",
  "12",
  "13",
  "17",
  "18",
  "19",
  "59",
  "77",
  "78",
  "31",
  "32",
  "33",
  "38",
  "95",
  "96",
  "97",
  "98",
  "99",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "59",
];
const optelkom = ["52", "53", "11", "12", "13", "21", "22", "23", "51"];
const opindosat = ["55", "56", "57", "58", "11", "12", "14", "15", "16"];
const opxl = ["11", "12", "13", "17", "18", "19", "59", "77", "78"];
const opaxis = ["31", "32", "33", "38"];
const opthree = ["95", "96", "97", "98", "99"];
const opsmart = ["81", "82", "83", "84", "85", "86", "87", "88", "89"];
const opmentari = ["59"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomNumber(length) {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(request) {
  const { provider, digit, amount } = await request.json();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
  ];
  const numbers = [];

  let error = false;
  let message = "";
  let status = 200;
  if (!allowedOrigins.includes(origin)) {
    error = true;
    message = "Forbidden";
    status = 403;
  }
  if (!provider || !digit || !amount) {
    error = true;
    message = "All fields are required.";
    status = 400;
  }
  if (Number(provider) < 1 || Number(provider) > 8) {
    error = true;
    message = "Invalid provider selection.";
    status = 400;
  }
  if (Number(digit) < 12 || Number(digit) > 13) {
    error = true;
    message = "Invalid digit selection.";
    status = 400;
  }
  if (Number(amount) < 1 || Number(amount) > 5) {
    error = true;
    message = "Invalid amount selection.";
    status = 400;
  }

  const digitCount = Number(digit) - 4;

  for (let i = 0; i < amount; i++) {
    let operatorPrefix;
    switch (provider) {
      case "1":
        operatorPrefix = getRandom(alloperatorprefix);
        break;
      case "2":
        operatorPrefix = getRandom(optelkom);
        break;
      case "3":
        operatorPrefix = getRandom(opindosat);
        break;
      case "4":
        operatorPrefix = getRandom(opxl);
        break;
      case "5":
        operatorPrefix = getRandom(opaxis);
        break;
      case "6":
        operatorPrefix = getRandom(opthree);
        break;
      case "7":
        operatorPrefix = getRandom(opsmart);
        break;
      case "8":
        operatorPrefix = getRandom(opmentari);
        break;
      default:
        operatorPrefix = getRandom(alloperatorprefix);
    }

    const randomDigits = generateRandomNumber(digitCount);
    const waNumber = `628${operatorPrefix}${randomDigits}`;
    numbers.push(waNumber);
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

  return NextResponse.json(
    {
      success: true,
      message: "Numbers generated successfully!",
      data: numbers,
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "warandom" }, { status: 200 });
}
