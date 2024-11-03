"use client";
import { createContext, useEffect, useState } from "react";
import getIp from "@/utils/getIp";

export const VisitorContext = createContext();

export function VisitorProvider({ children }) {
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    async function trackVisitors() {
      try {
        const ip = await getIp();
        await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ip }),
        });

        await fetch("/api/online", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ip, isOnline: true }),
        });

        const visitorResponse = await fetch("/api/visitors");
        const visitorData = await visitorResponse.json();
        setVisitorCount(visitorData.totalData);

        const onlineResponse = await fetch("/api/online");
        const onlineData = await onlineResponse.json();
        setOnlineCount(onlineData.totalData);

        window.addEventListener("beforeunload", async () => {
          await fetch("/api/online", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip, isOnline: false }),
          });
        });
      } catch (error) {
        console.error("Error tracking visit and status:", error);
      }
    }

    trackVisitors();
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return <VisitorContext.Provider value={{ visitorCount, onlineCount }}>{children}</VisitorContext.Provider>;
}
