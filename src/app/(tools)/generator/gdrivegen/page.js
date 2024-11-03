import CSR from "./csr";

export const metadata = {
  title: "Jtools - Google Drive Direct Download Generator",
  description: "Tools for generate direct link download google drive otomatis.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/gdrivegen`,
    title: "Jtools - Google Drive Direct Download Generator",
    description: "Tools for generate direct link download google drive otomatis.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/gdrivegen`,
  },
  other: {
    "itemProp:description": "Tools for generate direct link download google drive otomatis.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/gdrivegen`,
  },
};

export default function Page() {
  return <CSR />;
}
