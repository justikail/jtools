import CSR from "./csr";

export const metadata = {
  title: "Jtools - Fake Saldo BCA Generator",
  description: "Tools untuk generate fake screenshoot MyBCA dengan custom nomor rekening dan nominal saldo.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebca`,
    title: "Jtools - Fake Saldo BCA Generator",
    description: "Tools untuk generate fake screenshoot MyBCA dengan custom nomor rekening dan nominal saldo.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebca`,
  },
  other: {
    "itemProp:description": "Tools untuk generate fake screenshoot MyBCA dengan custom nomor rekening dan nominal saldo.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakebca`,
  },
};

export default function Page() {
  return <CSR />;
}
