import CSR from "./csr";

export const metadata = {
  title: "Jtools - HTTP Hit",
  description: "Tools for hit http request with custom headers and body, like postman, etc.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/lookup/httphit`,
    title: "Jtools - HTTP Hit",
    description: "Tools for hit http request with custom headers and body, like postman, etc.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/lookup/httphit`,
  },
  other: {
    "itemProp:description": "Tools for hit http request with custom headers and body, like postman, etc.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/lookup/httphit`,
  },
};

export default function Page() {
  return <CSR />;
}
