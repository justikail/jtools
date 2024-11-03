"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [state, setState] = useState({
    webshell: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = state.webshell !== "" && state.title !== "";

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setError(null);
    setResults(null);

    const response = await fetch("/api/shell-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webshell: state.webshell.split("\n"), title: state.title }),
    });

    const data = await response.json();
    if (response.ok) {
      setResults(data.data);
    } else {
      setError(data.error);
    }

    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = (e) => {
    e.preventDefault();

    const filteredResults = results.filter((result) => ["Timeout", "Failed"].includes(result.status) || result.titleFound || result.status == 200);
    const dataToDownload = filteredResults.map((r) => `${r.status}: ${r.link}`).join("\n");

    const blob = new Blob([dataToDownload], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "webshell.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <CardTools title="Webshell Checker" description="Tools untuk mengecek hidup atau tidak nya sebuah webshell.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">Webshell List:</span>
            <span className="label-text-alt text-sm">{state.webshell.split("\n").length}</span>
          </div>
          <textarea
            className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`}
            placeholder="Webshell List"
            value={state.webshell}
            onChange={(e) => setState({ ...state, webshell: e.target.value })}
            readOnly={loading}
          ></textarea>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-sm">Title:</span>
          </div>
          <input
            type="text"
            placeholder="E.g. Webshell By Hacker"
            className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            readOnly={loading}
          />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Check" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {results && (
        <>
          <button type="button" className="btn btn-secondary w-full" onClick={handleDownload}>
            Download
          </button>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="w-full">
                <tr className="w-full">
                  <th>Status</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {results.map((result, index) => (
                  <tr key={index} className="w-full">
                    <th className={`text-base-content ${["Timeout", "Failed"].includes(result.status) ? "text-warning" : result.titleFound ? "text-success" : "text-error" || result.status !== 200 ? "text-error" : "text-success"}`}>
                      {["Timeout", "Failed"].includes(result.status) ? "IDK" : result.titleFound ? "LIVE" : "DIE" || result.status !== 200 ? "DIE" : "LIVE"}
                    </th>
                    <td>
                      <a href={result.link} className="underline hover:no-underline break-all" target="_blank" rel="noreferrer">
                        {result.link}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </CardTools>
  );
}

export default CSR;
