"use client";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";
import { useState, useEffect, useRef } from "react";
import CollapseContainer from "@/components/collapse/collapseContainer";
import * as Uil from "@iconscout/react-unicons";

function CSR() {
  const [state, setState] = useState({
    text: "",
    model: "1",
    apikey: "",
    lang: "id",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const validModel = ["1", "2", "3"];
    const validLang = ["id", "en"];
    const isValid = state.text.trim() !== "" && validModel.includes(state.model) && validLang.includes(state.lang);

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/parafrase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
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

  const handleCopy = async (e) => {
    const result = e.target;
    result.select();

    await navigator.clipboard.writeText(result.value);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  return (
    <CardTools title="Parafrase with AI" description="Tools for automated parafrase or paraphrase with AI (Artificial Intelligence).">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-1 md:p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Text:</span>
            <span className="label-text-alt">{state.text.length}</span>
          </div>
          <textarea
            className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`}
            readOnly={loading}
            placeholder="Text in here..."
            value={state.text}
            onChange={(e) => setState({ ...state, text: e.target.value })}
          ></textarea>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Model:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.model} onChange={(e) => setState({ ...state, model: e.target.value })}>
            <option defaultValue>Pick one</option>
            <option value="1">Gemini Ai</option>
            <option value="2">Groq Ai</option>
            <option value="3">ChatGPT</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Languange:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.lang} onChange={(e) => setState({ ...state, lang: e.target.value })}>
            <option defaultValue>Pick one</option>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </label>
        <CollapseContainer isOpen={false} title={"Setting"}>
          <label className="input input-bordered flex items-center gap-2 w-full">
            {visibility ? (
              <Uil.UilEye size="16px" className="h-4 w-4 opacity-70 cursor-pointer" onClick={() => setVisibility(!visibility)} />
            ) : (
              <Uil.UilEyeSlash size="16px" className="h-4 w-4 opacity-70 cursor-pointer" onClick={() => setVisibility(!visibility)} />
            )}
            <input
              type={visibility ? "text" : "password"}
              className={`grow w-full ${loading && "cursor-not-allowed"}`}
              readOnly={loading}
              value={state.apikey}
              placeholder="(Optional) API KEY..."
              onChange={(e) => setState({ ...state, apikey: e.target.value })}
            />
          </label>
        </CollapseContainer>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Parafrase" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xs">Result:</span>
            <span className="label-text-alt text-sm">{isCopy ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
          </div>
          <textarea className="textarea textarea-bordered h-96 resize-y" onClick={handleCopy} value={result} readOnly></textarea>
        </label>
      )}
    </CardTools>
  );
}

export default CSR;
