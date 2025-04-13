import * as Uil from "@iconscout/react-unicons";

const categoryMap = {
  exploit: { name: "Exploit Tools", icon: Uil.UilWrench },
  programmer: { name: "Programmer Tools", icon: Uil.UilBracketsCurly },
  lookup: { name: "Lookup Tools", icon: Uil.UilSearch },
  image: { name: "Image Tools", icon: Uil.UilCamera },
  random: { name: "Random Tools", icon: Uil.UilPuzzlePiece },
  checker: { name: "Checker Tools", icon: Uil.UilCheck },
  generator: { name: "Generator Tools", icon: Uil.UilProcess },
  word: { name: "Word Tools", icon: Uil.UilPen },
  download: { name: "Download Tools", icon: Uil.UilImport },
};

const getCategoryMeta = (category) => ({
  name: categoryMap[category]?.name ?? category,
  icon: categoryMap[category]?.icon ?? Uil.UilQuestionCircle,
  key: category,
});

function formatToolsToMenuItems(apiData) {
  if (!apiData?.success || !Array.isArray(apiData.data)) return [];

  const grouped = {};

  apiData.data.forEach(({ link, name, isActive }) => {
    if (!isActive || !link.startsWith("/")) return;

    const [, category] = link.split("/");
    if (!category) return;

    if (!grouped[category]) {
      const meta = getCategoryMeta(category);
      grouped[category] = { ...meta, links: [] };
    }

    grouped[category].links.push({ href: link, label: name });
  });

  return Object.values(grouped);
}

export default formatToolsToMenuItems;
