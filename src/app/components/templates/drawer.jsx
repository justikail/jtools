import * as Uil from "@iconscout/react-unicons";
import Sidebar from "@/components/templates/sidebar";

function Drawer({ time }) {
  return (
    <div className="drawer max-w-max">
      <input id="toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200 w-max flex flex-col">
        <label htmlFor="toggle" className="btn drawer-button">
          <Uil.UilBars size="20px" color="#fff" />
          {time.split(", ")[0]}
        </label>
      </div>
      <Sidebar />
    </div>
  );
}

export default Drawer;
