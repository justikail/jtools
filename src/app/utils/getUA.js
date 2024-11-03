import fs from "fs";
import path from "path";

export function getRandomUserAgent(userAgents) {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

export default function getUA() {
  const filePath = path.join(process.cwd(), "public/assets/userAgents.txt");
  const userAgents = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((ua) => ua);
  return userAgents;
}
