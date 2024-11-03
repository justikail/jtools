"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import * as Uil from "@iconscout/react-unicons";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCopy, setIsCopy] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = script !== "";

    setIsDisabled(!isValid);
  }, [script]);

  const handleCopy = async (e) => {
    const result = e.target;
    result.select();

    await navigator.clipboard.writeText(result.value);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/jsogen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script }),
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

  return (
    <CardTools title="JSO Generator" description="Tools otomatis generate JSO (JavaScript Overlay).">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-xs">Script:</span>
            <span className="label-text-alt text-sm">{script.length}</span>
          </div>
          <textarea className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`} readOnly={loading} placeholder="Script HTML" value={script} onChange={(e) => setScript(e.target.value)}></textarea>
        </label>

        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Generate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-sm">Result:</span>
            <span className="label-text-alt text-sm">{isCopy ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
          </div>
          <input type="text" placeholder="Result" className="input input-bordered w-full" value={`<script type="text/javascript" src="${result}"/>`} onClick={handleCopy} readOnly />
        </label>
      )}
    </CardTools>
  );
}

export default CSR;
