import * as Uil from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import Link from "next/link";
import BtnMenu from "@/components/button/btnMenu";
import SearchModal from "@/components/modal/searchModal";
import menuItems from "./menuItems";

function Sidebar() {
  const [isOpen, setIsOpen] = useState({});
  const [showModal, setShowModal] = useState(false);

  const toggleItem = (item) => {
    setIsOpen((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setShowModal(true);
      }
      if (showModal && event.key === "Escape") {
        event.preventDefault();
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.addEventListener("keydown", handleKey);
    };
  }, [showModal]);

  return (
    <>
      <div className="drawer-side z-[99]">
        <label htmlFor="toggle" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-72 p-4 gap-4">
          <span className="mx-auto bg-base-300 text-center rounded-full px-4 py-2 font-bold border border-base-300 shadow-sm shadow-white w-20">Jtools</span>
          <label htmlFor="toggle" className="btn btn-sm bg-base-300 hover:bg-base-200 hover:shadow-sm hover:shadow-white" aria-label="close sidebar">
            <Uil.UilArrowLeft size="20px" color="#fff" />
          </label>
          <button className="btn btn-md bg-base-100 text-sm justify-between w-full flex items-center" onClick={() => setShowModal(true)}>
            Search Tools <kbd className="kbd kbd-sm">CtrlK</kbd>
          </button>
          <div className="divider my-0">LIST TOOLS</div>
          <ul className="flex flex-col gap-2">
            {menuItems.map((menu, index) => (
              <BtnMenu key={index} icon={menu.icon} condition={() => toggleItem(menu.key)} item={isOpen[menu.key]} menuName={menu.name}>
                {menu.links.map((link, index) => (
                  <li className="transition-colors" key={index}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </BtnMenu>
            ))}
          </ul>
          <div className="divider my-0">OTHER</div>
          <ul className="flex flex-col gap-2">
            <li className="flex justify-start bg-base-300 rounded-lg">
              <Link href="//pastein.vercel.app/">
                <Uil.UilClipboard size="18px" color="#fff" /> Pastein
              </Link>
            </li>
            <li className="flex justify-start bg-base-300 rounded-lg">
              <Link href="/store">
                <Uil.UilStore size="18px" color="#fff" /> Store
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {showModal && <SearchModal setShowModal={setShowModal} menuItems={menuItems} />}
    </>
  );
}

export default Sidebar;
