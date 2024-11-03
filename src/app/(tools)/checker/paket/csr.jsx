"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [state, setState] = useState({
    option: "",
    trackId: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = state.option !== "" && state.trackId !== "";

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setError(null);
    setResult(null);

    const response = await fetch("/api/resi-track", {
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
    <CardTools title="Resi Tracker" description="Tools untuk mengecek status paket, melacak paket, dan melihat lokasi.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kurir:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} value={state.option} onChange={(e) => setState({ ...state, option: e.target.value })} required readOnly={loading}>
            <option defaultValue>Pick one</option>
            <option value="jne">JNE</option>
            <option value="pos">POS Indonesia</option>
            <option value="jnt">J&T</option>
            <option value="jnt_cargo">J&T Cargo</option>
            <option value="sicepat">SiCepat</option>
            <option value="tiki">TIKI</option>
            <option value="anteraja">AnterAja</option>
            <option value="wahana">Wahana</option>
            <option value="ninja">Ninja Xpress</option>
            <option value="lion">Lion Parcel</option>
            <option value="pcp">PCP Express</option>
            <option value="jet">JET Express</option>
            <option value="rex">REX Express</option>
            <option value="first">First Logistics</option>
            <option value="ide">ID Express</option>
            <option value="spx">Shopee Express</option>
            <option value="kgx">KGXpress</option>
            <option value="sap">SAP Express</option>
            <option value="jx">JX Express</option>
            <option value="rpx">RPX</option>
            <option value="lzd">Lazada Express</option>
            <option value="indah">Indah Cargo</option>
            <option value="dakota">Dakota Cargo</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Resi:</span>
          </div>
          <input
            type="text"
            placeholder="Resi Number"
            className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
            value={state.trackId}
            onChange={(e) => setState({ ...state, trackId: e.target.value })}
            required
            readOnly={loading}
          />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Track" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <div className="form-control w-full gap-6">
          <span className="text-accent font-bold text-lg">Main Information</span>
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between w-full">
            <ul className="flex flex-col gap-2">
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">No. Resi:</strong> {result.summary.awb || "?"}
                </p>
              </li>
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Kurir:</strong> {result.summary.courier || "?"}
                </p>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Service:</strong> {result.summary.service || "?"}
                </p>
              </li>
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Status:</strong> {result.summary.status || "?"}
                </p>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Tanggal:</strong> {result.summary.date || "-"}
                </p>
              </li>
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Berat:</strong> {result.summary.weight || "-"}
                </p>
              </li>
            </ul>
          </div>
          <span className="text-accent font-bold text-lg">Detail Information</span>
          <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row w-full">
            <ul className="flex flex-col gap-2">
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Asal:</strong> {result.detail.origin || "-"}
                </p>
              </li>
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Tujuan:</strong> {result.detail.destination || "-"}
                </p>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Pengirim:</strong> {result.detail.shipper || "-"}
                </p>
              </li>
              <li className="list-disc">
                <p>
                  <strong className="text-secondary">Penerima:</strong> {result.detail.receiver || "-"}
                </p>
              </li>
            </ul>
          </div>
          <span className="text-accent font-bold text-lg">History</span>
          <ul className="steps steps-vertical gap-4">
            {result.history.map((item, index) => {
              const date = new Date(item.date);
              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };

              return (
                <li key={index} data-content={index !== 0 ? "✓" : "●"} className={`step ${index !== 0 ? "step-primary" : ""}`}>
                  <span className="flex flex-col text-start gap-2">
                    <span className="text-sm">{date.toLocaleString("id-ID", options)}</span>
                    {item.desc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
