import CSR from "./csr";

export const metadata = {
  title: "Jtools - Bulk Url Opener",
  description: "Tools for automatically open bulk url on new window.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/urlopen`,
    title: "Jtools - Bulk Url Opener",
    description: "Tools for automatically open bulk url on new window.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/urlopen`,
  },
  other: {
    "itemProp:description": "Tools for automatically open bulk url on new window.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/random/urlopen`,
  },
};

export default function Page() {
  return <CSR />;
}
