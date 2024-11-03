import CSR from "./csr";

export const metadata = {
  title: "Jtools - Fake Saldo BNI Generator",
  description: "Tools untuk generate fake screenshot BNI dengan custom No. Rekening, dan nominal saldo.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebni`,
    title: "Jtools - Fake Saldo BNI Generator",
    description: "Tools untuk generate fake screenshot BNI dengan custom No. Rekening, dan nominal saldo.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebni`,
  },
  other: {
    "itemProp:description": "Tools untuk generate fake screenshot BNI dengan custom No. Rekening, dan nominal saldo.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebni`,
  },
};

export default function Page() {
  return <CSR />;
}
