import CSR from "./csr";

export const metadata = {
  title: "Jtools - Parafrase with AI",
  description: "Tools for automated parafrase or paraphrase with AI (Artificial Intelligence).",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/parafrase`,
    title: "Jtools - Parafrase with AI",
    description: "Tools for automated parafrase or paraphrase with AI (Artificial Intelligence).",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/parafrase`,
  },
  other: {
    "itemProp:description": "Tools for automated parafrase or paraphrase with AI (Artificial Intelligence).",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/parafrase`,
  },
};

export default function Page() {
  return <CSR />;
}
