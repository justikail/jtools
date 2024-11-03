import CSR from "./csr";

export const metadata = {
  title: "Jtools - Word Counter",
  description: "Tools for automatically count total word, total paragraph, total sentence, and total character in some text.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/wordcounter`,
    title: "Jtools - Word Counter",
    description: "Tools for automatically count total word, total paragraph, total sentence, and total character in some text.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/wordcounter`,
  },
  other: {
    "itemProp:description": "Tools for automatically count total word, total paragraph, total sentence, and total character in some text.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/wordcounter`,
  },
};

export default function Page() {
  return <CSR />;
}
