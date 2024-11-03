"use client";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";
import * as Uil from "@iconscout/react-unicons";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCopy, setIsCopy] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = code !== "";
    setIsDisabled(!isValid);
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/htmlesc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data.data);
    } else {
      setError(data.data);
    }
    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async (e) => {
    const result = e.target;
    result.select();

    await navigator.clipboard.writeText(result.value);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  return (
    <CardTools title="HTML Escaper" description="Tools untuk melakukan escape HTML karakter">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-1 md:p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Code:</span>
            <span className="label-text-alt text-sm">{code.length}</span>
          </div>
          <textarea className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`} readOnly={loading} placeholder="Code" value={code} required onChange={(e) => setCode(e.target.value)}></textarea>
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Escape" />
        {error && <span className="w-full text-error">{error}</span>}
        {result && (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Result:</span>
              <span className="label-text-alt text-sm">{isCopy ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
            </div>
            <textarea className="textarea textarea-bordered h-40 resize-y" onClick={handleCopy} value={result} placeholder="Result" readOnly></textarea>
          </label>
        )}
      </form>
    </CardTools>
  );
}

export default CSR;
