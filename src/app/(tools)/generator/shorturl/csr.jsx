"use client";
import { useState, useEffect, useRef } from "react";
import * as Uil from "@iconscout/react-unicons";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";

function CSR() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const resultRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await fetch("/api/short-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    if (response.ok) {
      setResult(data.data);
    } else {
      setError(data.error);
    }
    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const isValid = url.trim() !== "" && (url.trim().startsWith("http://") || url.trim().startsWith("https://"));

    setIsDisabled(!isValid);
  }, [url]);

  const handleCopy = async (e) => {
    const result = e.target;
    result.select();

    await navigator.clipboard.writeText(result.value);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  return (
    <CardTools title="URL Shortener" description="Tools for generate long url to more short url.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <Uil.UilLinkH size="16px" className="h-4 w-4 opacity-70" />
          <input type="text" className={`grow w-full ${loading && "cursor-not-allowed"}`} readOnly={loading} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://localhost/" required />
        </label>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Generate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Result:</span>
            <span className="label-text-alt text-sm">{isCopy ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
          </div>
          <input type="text" placeholder="Result" onClick={handleCopy} value={result} readOnly className="input input-bordered w-full" />
        </label>
      )}
    </CardTools>
  );
}

export default CSR;
