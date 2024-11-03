import CSR from "./csr";

export const metadata = {
  title: "Jtools - QRCode Generator",
  description: "Tools for generate QRCode with unique and custom style.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/qrcode`,
    title: "Jtools - QRCode Generator",
    description: "Tools for generate QRCode with unique and custom style.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/qrcode`,
  },
  other: {
    "itemProp:description": "Tools for generate QRCode with unique and custom style.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/generator/qrcode`,
  },
};

export default function Page() {
  return <CSR />;
}
