"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import * as Uil from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";

function CSR() {
  const [state, setState] = useState({
    name1: "",
    name2: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = state.name1.trim() !== "" && state.name2.trim() !== "";

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/love-rate", {
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

  const scoreColor = (score) => {
    if (score > 50) return "text-green-500";
    if (score > 35) return "text-yellow-500";
    return "text-red-500";
  };

  const renderHeart = (score) => {
    if (score > 50)
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} height="200px" width="200px" stroke="red" className="animate-beat">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      );
    if (score > 35)
      return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000" height="200px" width="200px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ffce31" d="M12.7 54.6l-2-2.1l19.1-19l2.1 2z"></path>
            <path d="M4.2 61s-.7-8.3 6.4-15.3l2.1 6.9L4.2 61" fill="#42ade2"></path>
            <path d="M4.2 61s8.3.7 15.4-6.4l-6.9-2.1L4.2 61" fill="#467591"></path>
            <path d="M54.7 24.3c-5.7-15-24.2-8.3-26-.8c-2.4-8-20.4-14-26 .8c-6.1 16.4 23.8 31.2 26 33.6c2.2-1.9 32.2-17.4 26-33.6" fill="#ff5a79"></path>
            <path fill="#ffce31" d="M37.1 30.1l-2.4-2.3l16.8-16.7l2.3 2.4z"></path>
            <g fill="#467591">
              <path d="M40.9 21.7s-.4-9.9 8.4-18.7l2.2 8.1l-10.6 10.6"> </path> <path d="M43.2 24s9.9.4 18.8-8.4l-8.2-2.2L43.2 24"> </path>
            </g>
          </g>
        </svg>
      );

    return (
      <svg fill="#ff0000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#ff0000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <g>
                <path d="M375.026,46.268c-31.688,0-62.593,12.083-87.023,34.024c-1.109,0.995-1.989,2.215-2.588,3.579 c-0.28,0.636-0.557,1.16-0.849,1.603l-34.157,51.588c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.589 c2.321,3.505,2.321,8.033,0.001,11.537l-34.158,51.592c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.59 c2.321,3.505,2.321,8.033,0,11.536l-34.159,51.6c-2.314,3.497-2.314,8.039,0.001,11.537l30.229,45.663 c2.002,3.024,5.323,4.681,8.722,4.681c1.768,0,3.559-0.449,5.196-1.389c36.187-20.783,88.685-54.506,133.289-97.143 C483.685,299.547,512,246.619,512,195.613C512,113.264,450.554,46.268,375.026,46.268z M292.615,427.013l-20.964-31.668 l30.34-45.831c6.96-10.512,6.959-24.097-0.001-34.609l-30.338-45.822l30.339-45.823c6.96-10.513,6.96-24.097-0.001-34.61 l-30.338-45.821l30.336-45.817c0.529-0.797,1.02-1.626,1.483-2.501c20.342-17.651,45.672-27.346,71.556-27.346 c64.004,0.001,116.076,57.623,116.076,128.448C491.102,297.08,358.555,388.053,292.615,427.013z"></path>
                <path d="M225.345,401.113c-2.32-3.504-2.32-8.032,0-11.536l34.158-51.599c2.314-3.497,2.314-8.038-0.001-11.536l-34.157-51.591 c-2.321-3.505-2.321-8.033-0.001-11.537l34.158-51.592c2.315-3.497,2.315-8.039,0-11.537l-34.157-51.59 c-2.321-3.504-2.321-8.032,0-11.536l16.854-25.455c2.469-3.729,2.29-8.617-0.444-12.156 c-26.11-33.798-64.302-53.182-104.781-53.182C61.446,46.268,0,113.264,0,195.613c0,57.885,36.172,117.873,107.512,178.292 c54.559,46.209,113.524,78.786,136.342,90.649c1.528,0.794,3.179,1.178,4.815,1.178c2.892,0,5.738-1.199,7.772-3.461 c3.186-3.54,3.575-8.785,0.946-12.757L225.345,401.113z M121.017,357.958C54.582,301.692,20.898,247.071,20.898,195.613 c0-70.825,52.071-128.447,116.076-128.447c31.624,0,61.693,14.245,83.545,39.332l-12.598,19.026 c-6.962,10.514-6.962,24.098,0,34.611l30.338,45.821l-30.339,45.823c-6.96,10.513-6.96,24.097,0.001,34.61l30.338,45.823 l-30.34,45.831c-6.958,10.512-6.958,24.095,0,34.606c0,0,0,0,0,0.001l8.275,12.498 C189.269,409.099,154.276,386.125,121.017,357.958z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  };

  return (
    <CardTools title="Love Rate" description="Tools for measure the compatibility of two names.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama 1:</span>
          </div>
          <input
            type="text"
            placeholder="Nama 1..."
            value={state.name1}
            required
            onChange={(e) => setState({ ...state, name1: e.target.value })}
            className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
            disabled={loading}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama 2:</span>
          </div>
          <input
            type="text"
            placeholder="Nama 2..."
            value={state.name2}
            required
            onChange={(e) => setState({ ...state, name2: e.target.value })}
            className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
            disabled={loading}
          />
        </label>
        <BtnSubmit isDisabled={isDisabled} loading={loading} innerText="Check" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <div className="flex w-full p-1 md:p-4 gap-8 flex-col">
          <span className={scoreColor(result.score)}>Score: {result.score}%</span>
          <div className="w-full gap-4 items-center flex flex-col">
            <span className="text-xl font-bold text-center">{result.name1}</span>
            {renderHeart(result.score)}
            <span className="text-xl font-bold text-center">{result.name2}</span>
          </div>
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
