import CSR from "./csr";

export const metadata = {
  title: "Jtools - Webshell Checker",
  description: "Tools for check webshell is live or not in bulk list.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/webshell`,
    title: "Jtools - Webshell Checker",
    description: "Tools for check webshell is live or not in bulk list.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/webshell`,
  },
  other: {
    "itemProp:description": "Tools for check webshell is live or not in bulk list.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/webshell`,
  },
};

export default function Page() {
  return <CSR />;
}
