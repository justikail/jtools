import CSR from "./csr";

export const metadata = {
  title: "Jtools - Fake Saldo DANA Generator",
  description: "Tools untuk generate fake screenshoot DANA dengan custom nominal saldo.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakedana`,
    title: "Jtools - Fake Saldo DANA Generator",
    description: "Tools untuk generate fake screenshoot DANA dengan custom nominal saldo.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakedana`,
  },
  other: {
    "itemProp:description": "Tools untuk generate fake screenshoot DANA dengan custom nominal saldo.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/fakedana`,
  },
};

export default function Page() {
  return <CSR />;
}
