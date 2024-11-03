import CSR from "./csr";

export const metadata = {
  title: "Jtools - URL Shortener",
  description: "Tools for generate long url to more short url.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/shorturl`,
    title: "Jtools - URL Shortener",
    description: "Tools for generate long url to more short url.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/shorturl`,
  },
  other: {
    "itemProp:description": "Tools for generate long url to more short url.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/shorturl`,
  },
};

export default function Page() {
  return <CSR />;
}
