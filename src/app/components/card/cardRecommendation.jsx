import { useEffect, useState } from "react";

function CardRecommendation() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async (e) => {
      const response = await fetch("/api/tools");
      const data = await response.json();
      const shuffledTools = data.data.sort(() => 0.5 - Math.random());
      setTools(shuffledTools.slice(0, 5));
      setLoading(false);
    };

    fetchTools();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center bg-custom bg-base-content px-16 py-4 rounded-md rounded-t-none">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => <div key={index} className="skeleton h-10 w-36"></div>)
        : tools &&
          tools.map((tool, index) => (
            <a key={index} href={`${process.env.NEXT_PUBLIC_PRIMARY_URL}/${tool.link}`} className="text-center text-base-content bg-neutral px-4 py-2 rounded-full shadow hover:shadow-2xl transition-shadow">
              {tool.name}
            </a>
          ))}
    </div>
  );
}

export default CardRecommendation;
