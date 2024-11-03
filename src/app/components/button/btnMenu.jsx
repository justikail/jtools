import * as Uil from "@iconscout/react-unicons";

function BtnMenu({ children, icon, condition, item, menuName }) {
  const Icon = icon;

  return (
    <li className="flex flex-col space-y-4">
      <button type="button" onClick={condition} className="relative flex justify-start btn btn-md bg-base-300">
        <Icon size="18px" color="#fff" /> {menuName}
        {item ? <Uil.UilAngleDown size="16px" color="#fff" className="absolute right-2" /> : <Uil.UilAngleLeft size="16px" color="#fff" className="absolute right-2" />}
      </button>
      {item && <ul className="flex flex-col gap-4">{children}</ul>}
    </li>
  );
}

export default BtnMenu;
