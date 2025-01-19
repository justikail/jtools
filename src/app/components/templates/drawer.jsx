import * as Uil from "@iconscout/react-unicons";
import Sidebar from "@/components/templates/sidebar";

// export async function getServerSideProps() {
//   const iconsMap = {
//     exploit: "Uil.UilWrench",
//     programmer: "Uil.UilBracketsCurly",
//     lookup: "Uil.UilSearch",
//     image: "Uil.UilCamera",
//     random: "Uil.UilPuzzlePiece",
//     checker: "Uil.UilCheck",
//     generator: "Uil.UilProcess",
//     word: "Uil.UilPen",
//     download: "Uil.UilImport",
//   };

//   try {
//     const response = await fetch("https://jtools.my.id/api/tools");
//     if (!response.ok) {
//       throw new Error("Failed to fetch tools");
//     }
//     const { success, data } = await response.json();

//     if (!success) {
//       throw new Error("Failed to fetch tools");
//     }

//     const activeTools = data.filter((tool) => tool.isActive);
//     const categorizedTools = activeTools.reduce((acc, tool) => {
//       const category = tool.link.split("/")[1];
//       if (!acc[category]) {
//         acc[category] = {
//           name: `${category.charAt(0).toUpperCase()}${category.slice(1)} Tools`,
//           icon: iconsMap[category] || Uil.UilQuestion,
//           key: category,
//           links: [],
//         };
//       }
//       acc[category].links.push({
//         href: tool.link,
//         label: tool.name,
//       });
//       return acc;
//     }, {});

//     const menuItems = Object.values(categorizedTools);
//     return {
//       props: {
//         tools: menuItems,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching tools:", error);
//     return {
//       props: {
//         tools: [],
//       },
//     };
//   }
// }

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
