"use client";
import * as Uil from "@iconscout/react-unicons";
import Link from "next/link";
import LgHomeCard from "@/components/card/lgHomeCard";
import SmHomeCard from "@/components/card/smHomeCard";
import CardBg from "@/components/card/cardBg";
import BreadCrumbs from "@/components/templates/breadCrumbs";
import { useEffect, useState, useContext } from "react";
import { VisitorContext } from "@/context/visitorContext";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [tools, setTools] = useState({ newsTools: [], brokenTools: 0, totalTools: 0 });
  const [loading, setLoading] = useState(false);
  const { visitorCount, onlineCount } = useContext(VisitorContext);

  useEffect(() => {
    const fetchToolsData = async () => {
      try {
        setLoading(true);
        const newsToolsResponse = await fetch("/api/tools?short=news");
        const brokenToolsResponse = await fetch("/api/tools?short=broke");
        const totalToolsResponse = await fetch("/api/tools");
        const newsTools = await newsToolsResponse.json();
        const brokenTools = await brokenToolsResponse.json();
        const totalTools = await totalToolsResponse.json();
        setTools({ newsTools: newsTools.data, brokenTools: brokenTools.data.length, totalTools: totalTools.totalData });
      } catch (error) {
        console.error("Error fetching tools:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToolsData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4">
      <BreadCrumbs />

      <div className="flex lg:flex-row flex-col items-center lg:items-start justify-center gap-4 mb-6 mt-4 mx-4">
        <div className="flex flex-col w-full lg:w-auto gap-2">
          <div className="flex lg:flex-row flex-col flex-1 lg:flex-initial gap-2">
            <SmHomeCard icon={Uil.UilUsersAlt} title="Visitors" text={visitorCount} color="#06b6d4" />
            <SmHomeCard icon={Uil.UilWrench} title="Tools" text={tools.totalTools} color="#eab308" />
          </div>
          <div className="flex lg:flex-row flex-col flex-1 lg:flex-initial gap-2">
            <SmHomeCard icon={Uil.UilUserCheck} title="Online" text={onlineCount} color="#10b981" />
            <SmHomeCard icon={Uil.UilLinkBroken} title="Broken" text={tools.brokenTools} color="#f43f5e" />
          </div>
        </div>
        <LgHomeCard icon={Uil.UilCoins} title="Donation">
          <p>Support author with ur donation:</p>
          <div className="flex flex-col text-sm mt-2 gap-1">
            <p>
              PerfectMoney{" "}
              <span className="text-yellow-500 underline hover:no-underline lg:tooltip tooltip-right text-md" data-tip="Copy" onClick={(e) => navigator.clipboard.writeText(e.target.innerText)}>
                U29263830
              </span>
            </p>
            <p>
              Saweria{" "}
              <Link href={"https://saweria.co/jtools"} className="text-yellow-500 underline hover:no-underline text-md">
                Jtools
              </Link>
            </p>
            <p>
              Trakteer
              <Link href={"https://trakteer.id/Jtools"} className="text-yellow-500 underline hover:no-underline text-md">
                Jtools
              </Link>
            </p>
          </div>
        </LgHomeCard>
        <LgHomeCard icon={Uil.UilWrench} title="Free Tools">
          <p>Free tools for everyone, made with a modern and trendy UI and tech. Start From helping programmers, bug hunters, and more.</p>
        </LgHomeCard>
      </div>

      <div className="divider my-0"></div>

      <div className="flex flex-col lg:flex-row md:flex-row my-6 mx-4 gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="card image-full bg-base-100 w-full shadow-base-200 transition-shadow hover:shadow-base-300 shadow-2xl border border-base-content h-max">
            <CardBg />
            <div className="card-body">
              <h2 className="card-title">
                <Uil.UilLabelAlt size="25px" color="#eab308" /> New Tools
              </h2>
              <div className="divider my-0"></div>
              <ul className="flex flex-col justify-center gap-2">
                {loading ? (
                  <li className="skeleton h-4 w-20"></li>
                ) : (
                  tools.newsTools &&
                  tools.newsTools.map((tool, index) => (
                    <li key={index} className="list-disc">
                      <Link href={tool.link} className="hover:text-yellow-500 underline hover:no-underline transition-all">
                        {tool.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/2 border border-base-content rounded-2xl h-max">
          <div className="flex justify-center items-center gap-2 m-4">
            <Uil.UilComment size="20px" color="#eab308" />
            <h1 className="uppercase font-bold">Live Chat</h1>
            {isOpen ? (
              <Uil.UilAngleDown size="20px" color="#eab308" onClick={() => setIsOpen(false)} className="cursor-pointer" />
            ) : (
              <Uil.UilAngleLeft size="20px" color="#eab308" onClick={() => setIsOpen(true)} className="cursor-pointer" />
            )}
          </div>
          {isOpen && <iframe src="https://www5.cbox.ws/box/?boxid=952634&boxtag=y3vZA9" width="100%" height="450" allow="autoplay" className="rounded-b-2xl" />}
        </div>
      </div>
    </main>
  );
}
