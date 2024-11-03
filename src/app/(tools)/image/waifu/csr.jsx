"use client";
import { useState, useEffect, useRef } from "react";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";
import SSR from "./ssr";

function CSR() {
  const [state, setState] = useState({
    category: "",
    type: "sfw",
    count: "",
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
    const response = await fetch("/api/gacha-waifu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: state.category, type: state.type, count: state.count }),
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
    const category = [
      "waifu",
      "neko",
      "shinobu",
      "megumin",
      "bully",
      "cuddle",
      "cry",
      "hug",
      "awoo",
      "kiss",
      "lick",
      "pat",
      "smug",
      "bonk",
      "yeet",
      "blush",
      "smile",
      "wave",
      "highfive",
      "handhold",
      "nom",
      "bite",
      "glomp",
      "slap",
      "kill",
      "kick",
      "happy",
      "wink",
      "poke",
      "dance",
      "cringe",
      "trap",
      "blowjob",
    ];
    const type = ["sfw", "nsfw"];
    const count = ["1", "2", "3", "4", "5"];
    const isValid = category.includes(state.category) && type.includes(state.type) && count.includes(state.count);

    setIsDisabled(!isValid);
  }, [state]);

  return (
    <CardTools title="Gacha Waifu" description="Tools for generate Waifu Image with multiple category and type.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.type} onChange={(e) => setState({ ...state, type: e.target.value })}>
            <option defaultValue>Pick one</option>
            <option value="sfw">SFW</option>
            <option value="nsfw">NSWF</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Category:</span>
          </div>
          <select className={`select select-bordered capitalize ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.category} onChange={(e) => setState({ ...state, category: e.target.value })}>
            <option defaultValue>Pick one</option>
            {state.type === "nsfw" && (
              <>
                <option value="waifu">waifu</option>
                <option value="neko">neko</option>
                <option value="trap">trap</option>
                <option value="blowjob">blowjob</option>
              </>
            )}
            {state.type === "sfw" && (
              <>
                <option value="waifu">waifu</option>
                <option value="neko">neko</option>
                <option value="shinobu">shinobu</option>
                <option value="megumin">megumin</option>
                <option value="bully">bully</option>
                <option value="cuddle">cuddle</option>
                <option value="cry">cry</option>
                <option value="hug">hug</option>
                <option value="awoo">awoo</option>
                <option value="kiss">kiss</option>
                <option value="lick">lick</option>
                <option value="pat">pat</option>
                <option value="smug">smug</option>
                <option value="bonk">bonk</option>
                <option value="yeet">yeet</option>
                <option value="blush">blush</option>
                <option value="smile">smile</option>
                <option value="wave">wave</option>
                <option value="highfive">highfive</option>
                <option value="handhold">handhold</option>
                <option value="nom">nom</option>
                <option value="bite">bite</option>
                <option value="glomp">glomp</option>
                <option value="slap">slap</option>
                <option value="kill">kill</option>
                <option value="kick">kick</option>
                <option value="happy">happy</option>
                <option value="wink">wink</option>
                <option value="poke">poke</option>
                <option value="dance">dance</option>
                <option value="cringe">cringe</option>
              </>
            )}
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Total:</span>
          </div>
          <select className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading} value={state.count} onChange={(e) => setState({ ...state, count: e.target.value })}>
            <option defaultValue>Pick one</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Gacha" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <>
          <div className="flex flex-col p-1 md:p-4 gap-4 w-full">
            <p className="text-sm">
              <i>
                Note: <span className="text-info">*Click image for download.</span>
              </i>
            </p>
          </div>
          <SSR data={result} />
        </>
      )}
    </CardTools>
  );
}

export default CSR;
