import fs from "fs";
import path from "path";

export default function getAdminPaths() {
  const filePath = path.join(process.cwd(), "public/assets/adminPath.txt");
  const adminPaths = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((p) => p);
  return adminPaths;
}
