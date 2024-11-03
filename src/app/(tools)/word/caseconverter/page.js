import CSR from "./csr";

export const metadata = {
  title: "Jtools - Word Case Converter",
  description: "Tools for automatically convert word to another case type, like Camel Case, Upper Case, Lower Case, Etc.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/caseconverter`,
    title: "Jtools - Word Case Converter",
    description: "Tools for automatically convert word to another case type, like Camel Case, Upper Case, Lower Case, Etc.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/caseconverter`,
  },
  other: {
    "itemProp:description": "Tools for automatically convert word to another case type, like Camel Case, Upper Case, Lower Case, Etc.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/word/caseconverter`,
  },
};

export default function Page() {
  return <CSR />;
}
