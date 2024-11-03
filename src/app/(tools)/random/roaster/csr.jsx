"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import * as Uil from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";

function CSR() {
  const [state, setState] = useState({
    option: "1",
    user: "Justikail",
    model: "1",
    apikey: "",
  });
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const optionValue = parseInt(state.option, 10);
    const isValid = optionValue === 1 && ["1", "2", "3"].includes(state.model) && state.option !== "" && state.user !== "" && state.model !== "";

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await fetch("/api/roaster", {
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

  return (
    <CardTools title="Roaster" description="Roasting - Roasting - Roasting, Roasting diri kalian agar lebih bersemangat dan kuat mental &#128293;.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">Option:</span>
          </div>
          <select className={`select select-bordered w-full ${loading && "cursor-not-allowed"}`} disabled={loading} id="option" value={state.option} onChange={(e) => setState({ ...state, option: e.target.value })} name="option" required>
            <option defaultValue>Pick one</option>
            <option value="1">Github</option>
          </select>
        </label>

        {state.option && (
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Uil.UilUser size="16px" className="h-4 w-4 opacity-70" />
            <input type="text" className={`grow w-full ${loading && "cursor-not-allowed"}`} readOnly={loading} placeholder="Username github" value={state.user} onChange={(e) => setState({ ...state, user: e.target.value })} required />
          </label>
        )}
        <div className="collapse bg-transparent border border-base-300">
          <input type="checkbox" />
          <div className="collapse-title flex items-center text-sm font-medium">
            <Uil.UilAngleRight size="16px" className="h-4 w-4 opacity-70" /> Settings
          </div>
          <div className="collapse-content flex flex-col gap-2 w-full">
            <label className="form-control">
              <div className="label">
                <span className="label-text text-sm">AI Model:</span>
              </div>
              <select className={`select select-bordered w-full ${loading && "cursor-not-allowed"}`} disabled={loading} id="model" value={state.model} onChange={(e) => setState({ ...state, model: e.target.value })} name="model">
                <option defaultValue>Pick one</option>
                <option value="1">Gemini</option>
                <option value="2">GroqAi</option>
                <option value="3">ChatGPT</option>
              </select>
            </label>
            <div className="form-control w-full">
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
            </div>
          </div>
        </div>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Roasting &#128293;" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <div className="p-1 md:p-4 flex gap-4 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-sm">Result:</span>
              <span className="label-text-alt text-xs">{result.length}</span>
            </div>
            <textarea className="textarea textarea-bordered h-80 resize-y" placeholder="result" name="result" id="result" value={result} readOnly></textarea>
          </label>
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
