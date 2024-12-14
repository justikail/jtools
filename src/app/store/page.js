"use client";
import BreadCrumbs from "@/components/templates/breadCrumbs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Store() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/store");
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4">
      <BreadCrumbs />

      <div className="flex flex-row justify-center flex-wrap gap-4 my-4">
        {loading ? (
          <div className="skeleton h-60 w-96"></div>
        ) : (
          product.map((item, index) => (
            <div key={index} className="card bg-base-100 image-full w-96 shadow-xl border border-white">
              <figure>
                <Image src="https://assets.vercel.com/image/upload/v1649775681/docs-assets/static/guides/images/Dark.png" alt="Shoes" fill style={{ objectFit: "cover" }} priority={false} className="rounded-2xl" />
              </figure>
              <div className="card-body">
                <h2 className="card-title underline">{item.name}</h2>
                <p className="text-sm">{item.description}</p>
                <div className="card-actions justify-end pt-2">
                  <a
                    href={`https://wa.me/6285692202285?text=Asssalamualaikum.%20Permisi%20Saya%20Ingin%20Membeli%20Product%20Berikut%20:%0A%0A*Product:%20${item.name}*%0A*Harga:%20${new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.price)}*%0A%0ATerima%20kasih.`}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.price)}
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
