import CSR from "./csr";

export const metadata = {
  title: "Jtools - Love Rate",
  description: "Tools for measure the compatibility of two names.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/love-rate`,
    title: "Jtools - Love Rate",
    description: "Tools for measure the compatibility of two names.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/love-rate`,
  },
  other: {
    "itemProp:description": "Tools for measure the compatibility of two names.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/love-rate`,
  },
};

export default function Page() {
  return <CSR />;
}
