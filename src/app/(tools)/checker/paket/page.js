import CSR from "./csr";

export const metadata = {
  title: "Jtools - Resi Tracker",
  description: "Tools for tracking shipment information, history, location, etc.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/paket`,
    title: "Jtools - Resi Tracker",
    description: "Tools for tracking shipment information, history, location, etc.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/paket`,
  },
  other: {
    "itemProp:description": "Tools for tracking shipment information, history, location, etc.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/paket`,
  },
};

export default function Page() {
  return <CSR />;
}
