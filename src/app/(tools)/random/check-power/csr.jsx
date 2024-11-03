"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function CSR() {
  const [state, setState] = useState({
    nama: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const validGender = ["L", "P"];
    const isValid = state.nama !== "" && validGender.includes(state.gender);

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/check-power", {
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
    <CardTools title="Check Power" description="Check your power and skill based on your name and your gender.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama:</span>
          </div>
          <input type="text" placeholder="Youre name" className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`} readOnly={loading} value={state.nama} onChange={(e) => setState({ ...state, nama: e.target.value })} />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Gender:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.gender} onChange={(e) => setState({ ...state, gender: e.target.value })}>
            <option defaultValue>Pick one</option>
            <option value={"L"}>Laki - Laki</option>
            <option value={"P"}>Perempuan</option>
          </select>
        </label>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Check" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <fieldset className="border flex flex-col rounded-lg shadow-lg p-4 bg-base-300 w-full max-w-xs md:max-w-md mx-auto">
          <legend className="px-2 text-xl font-bold">
            Guild <span className="text-yellow-500">Card</span>
          </legend>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center md:items-start justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="capitalize">{result.name}.</h2>
              <h2>{result.gender === "L" ? "Laki - Laki" : "Perempuan"}.</h2>
            </div>
            <Image src={`https://anime.kirwako.com/api/avatar?gender=${result.gender === "L" ? "male" : "female"}&name=${result.name}`} alt={`Avatar ${result.name}`} width={125} height={125} className="-order-1 md:order-1 rounded-lg" />
          </div>
          <div className="divider text-yellow-500 text-sm">SKILLS</div>
          <ul className="flex justify-start md:justify-center w-full flex-wrap gap-4">
            {result.skills.map((skill, index) => (
              <li key={index} className="list-decimal ml-4">
                {skill.skillName}.
              </li>
            ))}
          </ul>
          <div className="divider text-yellow-500 text-sm">POWERS</div>
          <ul className="flex justify-start md:justify-center w-full flex-wrap gap-4">
            {result.powers.map((power, index) => (
              <li key={index} className="list-decimal ml-4">
                {power.powerName}.
              </li>
            ))}
          </ul>
          <div className="divider my-0"></div>
          <span className="w-full text-end text-xs">&copy; Justools Guild.</span>
        </fieldset>
      )}
    </CardTools>
  );
}

export default CSR;
