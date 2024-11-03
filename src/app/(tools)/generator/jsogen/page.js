import CSR from "./csr";

export const metadata = {
  title: "Jtools - JSO Generator",
  description: "Tools for automatically generate JSO (JavaScript Overlay)",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/jsogen`,
    title: "Jtools - JSO Generator",
    description: "Tools for automatically generate JSO (JavaScript Overlay)",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/jsogen`,
  },
  other: {
    "itemProp:description": "Tools for automatically generate JSO (JavaScript Overlay)",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/jsogen`,
  },
};

export default function Page() {
  return <CSR />;
}
