import { RateLimiterMemory } from "rate-limiter-flexible";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import { supabase } from "@/libs/supbase";
import getRandomApiKey, { getGeminiKey, getGptKey, getGroqKey } from "@/utils/getApiKey";
import OpenAI from "openai";

const rateLimiter = new RateLimiterMemory({
  points: 15,
  duration: 60,
});

async function getGithubData(username) {
  const headers = { Authorization: `token ${process.env.NEXT_PUBLIC_GHTOKEN}` };

  const profileResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
  const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, { headers });
  const readmeResponse = await fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`, { headers });

  const profileData = await profileResponse.json();
  const repoData = await repoResponse.json();
  const readmeData = await readmeResponse.text();

  const datas = {
    name: profileData.name || null,
    bio: profileData.bio || null,
    company: profileData.company || null,
    location: profileData.location || null,
    followers: profileData.followers || null,
    following: profileData.following || null,
    public_repos: profileData.public_repos || null,
    created_at: profileData.created_at || null,
    updated_at: profileData.updated_at || null,
    repositories: repoData
      ? repoData
          .map((repo) => ({
            name: repo.name || null,
            description: repo.description || null,
            language: repo.language || null,
            stargazers_count: repo.stargazers_count || null,
            open_issues_count: repo.open_issues_count || null,
            license: repo.license || null,
            fork: repo.fork || null,
            created_at: repo.created_at || null,
            updated_at: repo.updated_at || null,
          }))
          .slice(0, 50)
      : null,
  };

  return { datas, readme: readmeResponse.status !== 404 ? readmeData : null };
}

async function generateContent(model, prompt, apiKey) {
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
  const { option, user, model, apikey } = await request.json();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_PRIMARY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
    `${process.env.NEXT_PUBLIC_SECONDSRY_URL}`,
  ];
  let error = false;
  let message = "";
  let status = 200;

  try {
    await rateLimiter.consume(request.ip);
  } catch (rateLimiterRes) {
    error = true;
    message = "Too many requests. Please try again later.";
    status = 429;
  }
  if (!allowedOrigins.includes(origin)) {
    error = true;
    message = "Forbidden";
    status = 403;
  }
  if (!option || !user || !model) {
    error = true;
    message = "All fields are required";
    status = 400;
  }
  if (!["1"].includes(option)) {
    error = true;
    message = "Invalid option";
    status = 400;
  }
  if (!["1", "2", "3"].includes(model)) {
    error = true;
    message = "Invalid model";
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

  const { datas, readme } = await getGithubData(user);
  const prompt = `Berikan roasting singkat dengan kejam, menyindir, serta menyakitkan dalam bahasa gaul (Gunakan Gua, Lu. Jangan berikan nasihat atau saran. Tambahkan emoji agar lebih menyakitkan), untuk profile github berikut : ${
    datas.name
  }.\n\nDetail:\n\`\`\`\n${JSON.stringify(datas)}\n\`\`\`\n\nProfile Markdown:\n\`\`\`\n${readme ? readme : "Tidak ada profile markdown"}\n\`\`\``;

  let content;
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
  try {
    content = await generateContent(model, prompt, apiKey);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something wrong while generating content",
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Content generated successfully",
      totalData: content.length,
      data: content.trim(),
    },
    { status }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Roaster" }, { status: 200 });
}
