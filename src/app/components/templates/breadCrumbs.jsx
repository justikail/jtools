"use client";
import Link from "next/link";
import * as Uil from "@iconscout/react-unicons";
import { usePathname } from "next/navigation";

function BreadCrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <>
      <div className="breadcrumbs text-sm mx-4 mt-4">
        <ol>
          <li>
            <Link href="/">
              <Uil.UilEstate size="16px" color="#fff" />
            </Link>
          </li>
          {pathSegments.map((path, index) => {
            const goTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isActive = pathname === goTo;

            return (
              <li key={index}>
                {isActive ? (
                  <Link href={goTo} className={isActive ? "underline text-yellow-500" : ""}>
                    {path}
                  </Link>
                ) : (
                  <span>{path}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="divider my-0"></div>
    </>
  );
}

export default BreadCrumbs;
