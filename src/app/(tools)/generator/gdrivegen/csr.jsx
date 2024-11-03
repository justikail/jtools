"use client";
import CardTools from "@/components/card/cardTools";
import { useEffect, useState, useRef } from "react";
import * as Uil from "@iconscout/react-unicons";
import BtnSubmit from "@/components/button/btnSubmit";

function CSR() {
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [result, setResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = link.trim() !== "" && (link.trim().startsWith("https://drive.google.com/file/d/") || link.trim().startsWith("http://drive.google.com/file/d/"));

    setIsDisabled(!isValid);
  }, [link]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    if (link.trim().startsWith("https://drive.google.com/file/d/") || link.trim().startsWith("http://drive.google.com/file/d/")) {
      const gDriveId = link.split("/")[5];
      setResult(`https://drive.google.com/uc?export=download&id=${gDriveId}`);
    } else {
      setError("Invalid GDrive Link");
    }

    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async (e) => {
    const result = e.target;
    result.select();

    await navigator.clipboard.writeText(result.value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <CardTools title="GDrive Direct Link Generator" description="Tools untuk generate direct link download google drive otomatis.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <Uil.UilLinkH size="16px" className="h-4 w-4 opacity-70" />
          <input type="text" className="grow w-full" id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link GDrive" required />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Generate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xs">Result:</span>
            <span className="label-text-alt text-sm">{isCopied ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
          </div>
          <input type="text" placeholder="Result" onClick={handleCopy} className="input input-bordered w-full" value={result} readOnly />
        </label>
      )}
    </CardTools>
  );
}

export default CSR;
