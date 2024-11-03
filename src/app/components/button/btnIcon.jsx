import Link from "next/link";

function BtnIcon({ goTo, icon }) {
  const Icon = icon;

  return (
    <li className="bg-base-200 inline-flex items-center text-sm hover:bg-base-300">
      <Link href={goTo} className="px-4 py-[15px]">
        <Icon size="18px" color="#fff" />
      </Link>
    </li>
  );
}

export default BtnIcon;
