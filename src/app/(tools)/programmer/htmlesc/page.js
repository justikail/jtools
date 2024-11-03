import CSR from "./csr";

export const metadata = {
  title: "Jtools - HTML Escaper",
  description: "Tools for escape html code with escape function in javascript.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/htmlesc`,
    title: "Jtools - HTML Escaper",
    description: "Tools for escape html code with escape function in javascript.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/htmlesc`,
  },
  other: {
    "itemProp:description": "Tools for escape html code with escape function in javascript.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/htmlesc`,
  },
};

export default function Page() {
  return <CSR />;
}
