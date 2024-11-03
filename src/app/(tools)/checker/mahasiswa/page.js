import CSR from "./csr";

export const metadata = {
  title: "Jtools - Cari Mahasiswa & Dosen",
  description: "Tools untuk mencari mahasiswa & dosen berdasarkan nama, nim ataupun nidn.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/mahasiswa`,
    title: "Jtools - Cari Mahasiswa & Dosen",
    description: "Tools untuk mencari mahasiswa & dosen berdasarkan nama, nim ataupun nidn.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/mahasiswa`,
  },
  other: {
    "itemProp:description": "Tools untuk mencari mahasiswa & dosen berdasarkan nama, nim ataupun nidn.",
    "itemProp:url": `${process.env.NEXT_PUBLIC_PRIMARY_URL}/checker/mahasiswa`,
  },
};

export default function Page() {
  return <CSR />;
}
