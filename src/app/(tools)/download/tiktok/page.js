import CSR from "./csr";

export const metadata = {
  title: "Jtools - TikTok Downloader",
  description: "Tools for download tiktok video, and audio or get information from tiktok post.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/download/tiktok`,
    title: "Jtools - TikTok Downloader",
    description: "Tools for download tiktok video, and audio or get information from tiktok post.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/download/tiktok`,
  },
  other: {
    "itemProp:description": "Tools for download tiktok video, and audio or get information from tiktok post.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/download/tiktok`,
  },
};

export default function Page() {
  return <CSR />;
}
