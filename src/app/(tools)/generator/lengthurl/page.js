import CSR from "./csr";

export const metadata = {
  title: "Jtools - URL Lengthener",
  description: "Tools for generate long url to more long url.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/lengthurl`,
    title: "Jtools - URL Lengthener",
    description: "Tools for generate long url to more long url.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/lengthurl`,
  },
  other: {
    "itemProp:description": "Tools for generate long url to more long url.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/lengthurl`,
  },
};

export default function Page() {
  return <CSR />;
}
