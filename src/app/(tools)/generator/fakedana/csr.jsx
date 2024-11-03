"use client";
import CardTools from "@/components/card/cardTools";
import { useEffect, useState, useRef } from "react";
import BtnSubmit from "@/components/button/btnSubmit";

function CSR() {
  const [saldo, setSaldo] = useState("");
  const [result, setResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = saldo.trim() !== "";

    setIsDisabled(!isValid);
  }, [saldo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/fakedana", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saldo: parseInt(saldo) }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const screenShot = URL.createObjectURL(blob);
      setResult(screenShot);
    } else {
      const data = await response.json();
      setError(data.error);
    }

    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = `fake_saldo_dana.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CardTools title="Fake Saldo DANA Generator" description="Tools untuk generate fake screenshot DANA dengan custom nominal saldo.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Saldo:</span>
          </div>
          <input type="number" placeholder="Saldo E.g 100000" className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`} readOnly={loading} value={saldo} onChange={(e) => setSaldo(e.target.value)} />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Generate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <>
          <div className="flex flex-col gap-4 p-1 md:p-4 w-full">
            <button onClick={handleDownload} className="btn btn-secondary w-full">
              Download Screenshot
            </button>
          </div>
          <div className="bg-base-100 py-4 w-full rounded-lg">
            <div className="flex justify-center w-full items-center">
              <img src={result} alt="Fake ScreenShot" className="w-[293px] h-[585px] rounded-lg shadow-md shadow-base-content object-cover" />
            </div>
          </div>
        </>
      )}
    </CardTools>
  );
}

export default CSR;
