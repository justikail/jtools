"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import * as Uil from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";

function CSR() {
  const [state, setState] = useState({
    code: "<?php echo 'Hello World!'; ?>",
    option: "1",
  });
  const [result, setResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCopy, setIsCopy] = useState(false);
  const resultRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/phobfus", {
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

  useEffect(() => {
    const optionValue = parseInt(state.option, 10);

    const isValid = optionValue >= 1 && optionValue <= 4 && /^\d+$/.test(state.option) && state.code !== "";

    setIsDisabled(!isValid);
  }, [state]);

  const handleDownload = (e) => {
    e.preventDefault();
    const dataToDownload = result.trim();

    const blob = new Blob([dataToDownload], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jtools.php";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <CardTools title="PHP Obfuscator" description="Obfuscate your php code with PhObfus.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">PHP Code:</span>
            <span className="label-text-alt text-xs">{state.code.length}</span>
          </div>
          <textarea
            className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`}
            readOnly={loading}
            placeholder="code"
            name="code"
            id="code"
            value={state.code}
            onChange={(e) => setState({ ...state, code: e.target.value })}
            required
          ></textarea>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">Option:</span>
          </div>
          <select className={`select select-bordered w-full ${loading && "cursor-not-allowed"}`} disabled={loading} id="option" value={state.option} onChange={(e) => setState({ ...state, option: e.target.value })} name="option" required>
            <option defaultValue>Pick one</option>
            <option value="1">Weak</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Strong</option>
          </select>
        </label>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Obfuscate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <>
          <button type="button" className="btn btn-secondary w-full" onClick={handleDownload}>
            Download
          </button>
          <div className="p-1 md:p-4 flex gap-4 w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-xs">Result:</span>
                <span className="label-text-alt text-sm">{isCopy ? <Uil.UilCheck size="14px" color="#eab308" /> : <Uil.UilClipboard size="14px" color="#eab308" />}</span>
              </div>
              <textarea className="textarea textarea-bordered h-40 resize-y" placeholder="result" name="result" id="result" onClick={handleCopy} value={result} readOnly></textarea>
            </label>
          </div>
        </>
      )}
    </CardTools>
  );
}

export default CSR;
