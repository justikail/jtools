import Header from "@/components/templates/header";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "next/font/google";
import { Mate } from "next/font/google";
import { VisitorProvider } from "@/context/visitorContext";

const matemasie = Mate({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Jtools - Bulk Online Tools for Everyone",
  description: "All in one place for bulk online tools for everyone.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: process.env.NEXT_PUBLIC_PRIMARY_URL,
    title: "Jtools - Bulk Online Tools for Everyone",
    description: "All in one place for bulk online tools for everyone.",
    type: "website",
    siteName: "Jtools",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/favicon.ico`,
        alt: "Jtools",
      },
    ],
  },
  icons: {
    shortcut: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/favicon.ico`,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PRIMARY_URL,
  },
  other: {
    "itemProp:name": "Jtools",
    "itemProp:description": "All in one place for bulk online tools for everyone.",
    "itemProp:image": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/favicon.ico`,
    "itemProp:url": process.env.NEXT_PUBLIC_PRIMARY_URL,
    "itemProp:thumbnailUrl": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/favicon.ico`,
    author: "Justikail",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="dark">
      <body className={poppins.className}>
        <div className="lg:hidden flex items-center justify-center text-2xl font-bold text-white py-2 bg-base-200">
          <Link href={"/"} className={`${matemasie.className} underline`}>
            Jtools.
          </Link>
        </div>
        <Header />
        <VisitorProvider>{children}</VisitorProvider>
        <div className="divider my-0"></div>
        <footer className="footer bg-base-200 text-base-content py-4 w-full mx-auto">
          <nav className="flex justify-center items-center w-full gap-4">
            <Link href="/" className="link link-hover footer-title text-lg hover:text-white">
              Home
            </Link>
            <Link href="/about" className="link link-hover footer-title text-lg hover:text-white">
              About
            </Link>
            <Link href="/store" className="link link-hover footer-title text-lg hover:text-white">
              Store
            </Link>
          </nav>
        </footer>
        <div className="divider my-0"></div>
        <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
          <aside className="grid-flow-col items-center md:justify-self-start justify-self-center">
            <Link href="/" className="font-bold text-2xl">
              J<span className="text-yellow-500">tools.</span>
            </Link>
          </aside>
          <nav className="md:place-self-center md:justify-self-end justify-self-center">
            <div className="grid grid-flow-col gap-4">
              <span>
                &copy; 2024 Jtools | By{" "}
                <a href="//github.com/justikail" className="underline">
                  Justikail
                </a>
              </span>
            </div>
          </nav>
        </footer>
        {/* <footer className="flex justify-center m-4">
          <span className="text-center text-xs">
            Copyright &copy; 2024{" "}
            <Link href="/" className="underline hover:no-underline text-yellow-500">
              Jtools
            </Link>{" "}
            - Created By{" "}
            <Link href="//github.com/justikail" className="underline hover:no-underline text-yellow-500">
              Justikail
            </Link>
            .
          </span>
        </footer> */}
        <Analytics />
      </body>
    </html>
  );
}
