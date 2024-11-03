import * as Uil from "@iconscout/react-unicons";

function CollapseContainer({ title, children, isOpen }) {
  return (
    <div className={`collapse ${isOpen ? "collapse-open" : ""} bg-transparent border border-base-300`}>
      <input type="checkbox" />
      <div className="collapse-title flex items-center text-sm font-medium">
        <Uil.UilAngleRight size="16px" className="h-4 w-4 opacity-70" /> {title}
      </div>
      <div className="collapse-content flex flex-col gap-2 w-full">{children}</div>
    </div>
  );
}

export default CollapseContainer;
