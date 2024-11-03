import CSR from "./csr";

export const metadata = {
  title: "Jtools - Check Power",
  description: "Tools for Check your power and skill based on your name and your gender.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/check-power`,
    title: "Jtools - Check Power",
    description: "Tools for Check your power and skill based on your name and your gender.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/check-power`,
  },
  other: {
    "itemProp:description": "Tools for Check your power and skill based on your name and your gender.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/check-power`,
  },
};

export default function Page() {
  return <CSR />;
}
