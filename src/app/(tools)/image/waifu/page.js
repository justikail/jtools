import CSR from "./csr";

export const metadata = {
  title: "Jtools - Gacha Waifu",
  description: "Tools for generate Waifu Image with multiple category and type.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/image/waifu`,
    title: "Jtools - Gacha Waifu",
    description: "Tools for generate Waifu Image with multiple category and type.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/shorturl`,
  },
  other: {
    "itemProp:description": "Tools for generate Waifu Image with multiple category and type.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/shorturl`,
  },
};

export default function Page() {
  return <CSR />;
}
