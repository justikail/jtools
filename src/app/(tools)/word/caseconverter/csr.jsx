"use client";
import CardTools from "@/components/card/cardTools";
import BtnSubmit from "@/components/button/btnSubmit";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [state, setState] = useState({
    option: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatem quibusdam quod saepe, atque itaque iusto molestiae consectetur voluptas eligendi hic dolore voluptatibus totam sunt odit neque iure aliquid tempora! Adipisci porro facilis nesciunt provident perspiciatis dolorum deserunt dolorem asperiores quis dignissimos voluptatum accusantium voluptas, beatae omnis accusamus molestias sunt commodi, quasi neque. Delectus iste quasi, alias sapiente illo itaque!",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const optionValue = ["upper", "lower", "title", "sentence", "camel", "pascal", "snake", "kebab", "sponge", "dot", "train"];
    const isValid = state.text !== "" && optionValue.includes(state.option);

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);

    switch (state.option) {
      case "upper":
        setResult(state.text.toUpperCase());
        break;
      case "lower":
        setResult(state.text.toLowerCase());
        break;
      case "title":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "sentence":
        setResult(
          state.text
            .split(".")
            .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join(".")
        );
        break;
      case "camel":
        setResult(
          state.text
            .split(" ")
            .map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)))
            .join("")
        );
        break;
      case "pascal":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")
        );
        break;
      case "snake":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("_")
        );
        break;
      case "kebab":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.toLowerCase())
            .join("-")
        );
        break;
      case "sponge":
        setResult(
          state.text
            .split("")
            .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
            .join("")
        );
        break;
      case "dot":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.toLowerCase())
            .join(".")
        );
        break;
      case "train":
        setResult(
          state.text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("-")
        );
        break;
      default:
        setResult(null);
        setError("Invalid case type");
    }

    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const caseType = ["upper", "lower", "title", "sentence", "camel", "pascal", "snake", "kebab", "sponge", "dot", "train"];

  return (
    <CardTools title="Word Case Converter" description="Tools untuk menjadikan sebuah kata menjadi huruf kapital, huruf kecil, title, sentence, camel, pascal, snake, kebab, sponge, dot, train.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-1 md:p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Text:</span>
            <span className="label-text-alt">{state.text.length}</span>
          </div>
          <textarea className="textarea textarea-bordered h-40 resize-y" placeholder="Text" value={state.text} onChange={(e) => setState({ ...state, text: e.target.value })} required></textarea>
        </label>
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {caseType.map((type, index) => (
            <button className={`btn uppercase ${state.option === type ? "btn-secondary" : ""}`} type="button" key={index} onClick={() => setState({ ...state, option: type })}>
              {type}
            </button>
          ))}
        </div>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Submit" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && (
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Result:</span>
            <span className="label-text-alt">{result.length}</span>
          </div>
          <textarea className="textarea textarea-bordered h-40 resize-y" placeholder="Result" value={result} readOnly></textarea>
        </label>
      )}
    </CardTools>
  );
}

export default CSR;
