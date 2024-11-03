import CSR from "./csr";

export const metadata = {
  title: "Jtools - Fake Saldo Mandiri Generator",
  description: "Tools untuk generate fake screenshot Mandiri dengan custom No. Rekening, dan nominal saldo.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakemandiri`,
    title: "Jtools - Fake Saldo Mandiri Generator",
    description: "Tools untuk generate fake screenshot Mandiri dengan custom No. Rekening, dan nominal saldo.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakemandiri`,
  },
  other: {
    "itemProp:description": "Tools untuk generate fake screenshot Mandiri dengan custom No. Rekening, dan nominal saldo.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakemandiri`,
  },
};

export default function Page() {
  return <CSR />;
}
