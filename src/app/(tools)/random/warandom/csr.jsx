"use client";
import { useState, useEffect, useRef } from "react";
import * as Uil from "@iconscout/react-unicons";
import Link from "next/link";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";

function CSR() {
  const [state, setState] = useState({
    provider: "1",
    digit: "12",
    amount: "1",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await fetch("/api/warandom", {
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

  useEffect(() => {
    const providerValue = parseInt(state.provider, 10);
    const digitValue = parseInt(state.digit, 10);
    const amountValue = parseInt(state.amount, 10);

    const isValid = providerValue >= 1 && providerValue <= 8 && /^\d+$/.test(state.digit) && digitValue >= 12 && digitValue <= 13 && /^\d+$/.test(state.amount) && amountValue >= 1 && amountValue <= 5;

    setIsDisabled(!isValid);
  }, [state]);

  return (
    <CardTools title="Warandom" description="Gacha nomor whatsapp indonesia.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">Provider:</span>
          </div>
          <select
            className={`select select-bordered w-full ${loading && "cursor-not-allowed"}`}
            disabled={loading}
            id="provider"
            value={state.provider}
            onChange={(e) => setState({ ...state, provider: e.target.value })}
            name="provider"
            required
          >
            <option defaultValue>Pick one</option>
            <option value="1">All</option>
            <option value="2">Telkom</option>
            <option value="3">Indosat</option>
            <option value="4">XL</option>
            <option value="5">Axis</option>
            <option value="6">Three</option>
            <option value="7">Smartfren</option>
            <option value="8">Mentari</option>
          </select>
        </label>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-2 w-full text-sm">
              Digit
              <input
                type="text"
                className={`grow w-full ${loading && "cursor-not-allowed"}`}
                readOnly={loading}
                placeholder="E.g (12-13)"
                value={state.digit}
                onChange={(e) => setState({ ...state, digit: e.target.value })}
                name="digit"
                id="digit"
                inputMode="numeric"
                required
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-2 w-full text-sm">
              Jumlah
              <input
                type="text"
                className={`grow w-full ${loading && "cursor-not-allowed"}`}
                readOnly={loading}
                placeholder="E.g (1-5)"
                value={state.amount}
                onChange={(e) => setState({ ...state, amount: e.target.value })}
                name="amount"
                id="amount"
                inputMode="numeric"
                required
              />
            </label>
          </div>
        </div>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Generate" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <div className="flex flex-col gap-4 w-full">
          {result.map((goTo, index) => (
            <Link href={`//wa.me/${goTo}`} className="p-4 flex items-center hover:shadow-2xl transition-shadow gap-4 rounded-2xl border border-white" key={index}>
              <Uil.UilWhatsapp size="20px" color="#22c55e" /> {"0" + goTo.slice(2)}
            </Link>
          ))}
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
