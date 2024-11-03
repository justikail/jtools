import CSR from "./csr";

export const metadata = {
  title: "Jtools - WhatsApp Random Number Generator",
  description: "Tools for generate random Indonesian WhatsApp number with specify provider.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/warandom`,
    title: "Jtools - WhatsApp Random Number Generator",
    description: "Tools for generate random Indonesian WhatsApp number with specify provider.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/warandom`,
  },
  other: {
    "itemProp:description": "Tools for generate random Indonesian WhatsApp number with specify provider.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/warandom`,
  },
};

export default function Page() {
  return <CSR />;
}
