import { NextResponse } from "next/server";

const numerologiNama = (name) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let sum = 0;
  for (let char of name.toLowerCase()) {
    if (alphabet.includes(char)) {
      sum += alphabet.indexOf(char) + 1;
    }
  }
  return sum;
};

const kesamaanHuruf = (name1, name2) => {
  let matches = 0;
  for (let char of name1.toLowerCase()) {
    if (name2.toLowerCase().includes(char)) {
      matches += 1;
    }
  }
  return (matches / Math.min(name1.length, name2.length)) * 100;
};

const kesamaanSentence = (name1, name2) => {
  const words1 = name1.toLowerCase().split(" ");
  const words2 = name2.toLowerCase().split(" ");
  let matches = 0;

  for (let word of words1) {
    if (words2.includes(word)) {
      matches += 1;
    }
  }
  return (matches / Math.min(words1.length, words2.length)) * 100;
};

const kesamaanUrutanKarakter = (name1, name2) => {
  let matches = 0;
  const minLength = Math.min(name1.length, name2.length);

  for (let i = 0; i < minLength; i++) {
    if (name1[i].toLowerCase() === name2[i].toLowerCase()) {
      matches += 1;
    }
  }
  return (matches / minLength) * 100;
};

export async function POST(request) {
  const { name1, name2 } = await request.json();
  if (!name1 || !name2) {
    return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
  }
  if (/\d/.test(name1) || /\d/.test(name2)) {
    return NextResponse.json({ success: false, error: "Name is invalid." }, { status: 400 });
  }
  if (name1 && name2 && (name1.length <= 3 || name2.length <= 3)) {
    return NextResponse.json({ success: false, error: "Name must be at least 3 characters." }, { status: 400 });
  }
  if (name1.toLowerCase() == name2.toLowerCase()) {
    return NextResponse.json({ success: false, error: "Name must be different." }, { status: 400 });
  }

  let finalScore;
  const numerologiScore = (numerologiNama(name1) + numerologiNama(name2)) % 100;

  const lengthDifference = Math.abs(name1.length - name2.length);
  const lengthScore = lengthDifference <= 2 ? 90 : 50;

  const name1DominantScore = name1.length > name2.length ? 90 : 0;

  const commonSentenceScore = kesamaanSentence(name1, name2);
  const commonLetterScore = kesamaanHuruf(name1, name2);
  const commonChar = kesamaanUrutanKarakter(name1, name2);

  const sameFirstLetter = name1[0].toLowerCase() === name2[0].toLowerCase();
  const sameLastLetter = name1[name1.length - 1].toLowerCase() === name2[name2.length - 1].toLowerCase();
  const firstLastLetterScore = (sameFirstLetter ? 50 : 0) + (sameLastLetter ? 50 : 0);

  finalScore = Math.min(Math.round((numerologiScore + lengthScore + commonSentenceScore + name1DominantScore + commonLetterScore + commonChar + firstLastLetterScore) / 5), 96);

  if (name1 == "Haikal Siregar" && name2 == "Yorushika Songs") {
    finalScore = 100;
  }
  if (name1 == "Denny" && name2 == "Yusril") {
    finalScore = 100;
  }

  return NextResponse.json(
    {
      success: true,
      message: "Love Rate successfully.",
      data: {
        name1,
        name2,
        score: finalScore,
      },
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ tools: "Love Rate" }, { status: 200 });
}
