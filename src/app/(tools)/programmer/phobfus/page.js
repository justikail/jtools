import CSR from "./csr";

export const metadata = {
  title: "Jtools - PHP Obfuscator",
  description: "Tools for Obfuscate PHP Code with simple PHP Obfuscator logic.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/phobfus`,
    title: "Jtools - PHP Obfuscator",
    description: "Tools for Obfuscate PHP Code with simple PHP Obfuscator logic.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/phobfus`,
  },
  other: {
    "itemProp:description": "Tools for Obfuscate PHP Code with simple PHP Obfuscator logic.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/programmer/phobfus`,
  },
};

export default function Page() {
  return <CSR />;
}
