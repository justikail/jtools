export default function getRandomApiKey(ApiKey) {
  const apiKeyList = ApiKey.split(",");
  return apiKeyList[Math.floor(Math.random() * apiKeyList.length)];
}

export const getGeminiKey = () => process.env.NEXT_PUBLIC_GEMINI_KEY;
export const getGroqKey = () => process.env.NEXT_PUBLIC_GROQ_KEY;
export const getGptKey = () => process.env.NEXT_PUBLIC_GPT_KEY;
