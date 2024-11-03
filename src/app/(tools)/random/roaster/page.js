import CSR from "./csr";

export const metadata = {
  title: "Jtools - Roasting online",
  description: "Tools for roasting github, roasting linkedin, etc with Gemini or GroqAI.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/roaster`,
    title: "Jtools - Roasting online",
    description: "Tools for roasting github, roasting linkedin, etc with Gemini or GroqAI.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/roaster`,
  },
  other: {
    "itemProp:description": "Tools for roasting github, roasting linkedin, etc with Gemini or GroqAI.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/roaster`,
  },
};

export default function Page() {
  return <CSR />;
}
