"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import * as Uil from "@iconscout/react-unicons";
import { useEffect, useState, useRef } from "react";

function CSR() {
  const [request, setRequest] = useState({
    url: "https://localhost",
    method: "GET",
    headers: [],
    body: "",
  });
  const [response, setResponse] = useState(null);
  const [newHeader, setNewHeader] = useState({ key: "", value: "" });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const validMethods = ["GET", "POST", "PUT", "DELETE"];
    const isValid = request.url.trim() !== "" && validMethods.includes(request.method) && (request.method !== "GET" ? request.body.trim() !== "" : true) && Array.isArray(request.headers);

    setIsDisabled(!isValid);
  }, [request]);

  const handleAddHeader = () => {
    if (newHeader.key && newHeader.value) {
      setRequest((prevRequest) => {
        const existingHeaderIndex = prevRequest.headers.findIndex((header) => header.key === newHeader.key);
        if (existingHeaderIndex >= 0) {
          const updatedHeaders = [...prevRequest.headers];
          updatedHeaders[existingHeaderIndex] = { ...updatedHeaders[existingHeaderIndex], value: newHeader.value };
          return { ...prevRequest, headers: updatedHeaders };
        } else {
          return { ...prevRequest, headers: [...prevRequest.headers, newHeader] };
        }
      });
      setNewHeader({ key: "", value: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResponse(null);
    setError(null);

    const response = await fetch("/api/httphit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (response.ok) {
      setResponse({ status: response.status, response: data.data.trim() });
    } else {
      setError(data.error);
    }
    setLoading(false);
    setIsDisabled(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CardTools title="HTTP Hit" description="Create your HTTP Request and hit the Request with custom body.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <div className="form-control w-full">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Uil.UilLinkH size="16px" className="h-4 w-4 opacity-70" />
            <input
              type="text"
              className={`grow w-full ${loading && "cursor-not-allowed"}`}
              readOnly={loading}
              id="url"
              name="url"
              value={request.url}
              onChange={(e) => setRequest((prevRequest) => ({ ...prevRequest, url: e.target.value }))}
              required
            />
          </label>
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-sm">Method:</span>
          </div>
          <select
            className={`select select-bordered w-full ${loading && "cursor-not-allowed"}`}
            disabled={loading}
            id="method"
            value={request.method}
            onChange={(e) => setRequest((prevRequest) => ({ ...prevRequest, method: e.target.value }))}
            name="method"
            required
          >
            <option defaultValue>Pick one</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <div className="form-control w-full gap-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text text-sm">Headers:</span>
              <span className="label-text-alt text-xs">{request.headers.length}</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-40 resize-y cursor-not-allowed"
              placeholder="Header list"
              name="headers"
              id="headers"
              value={request.headers.map(({ key, value }) => `${key}: ${value}`).join("\n")}
              readOnly
            ></textarea>
          </label>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Key"
                className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
                name="headerkey"
                value={newHeader.key}
                onChange={(e) => setNewHeader({ ...newHeader, key: e.target.value })}
                readOnly={loading}
              />
            </div>
            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Value"
                className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
                name="headervalue"
                value={newHeader.value}
                onChange={(e) => setNewHeader({ ...newHeader, value: e.target.value })}
                readOnly={loading}
              />
            </div>
          </div>
          <button type="button" className={`btn btn-outline mt-2 w-full ${loading && "cursor-not-allowed"}`} disabled={loading} onClick={handleAddHeader}>
            Add Header
          </button>
        </div>
        {request.method !== "GET" && (
          <label className="form-control">
            <div className="label">
              <span className="label-text text-sm">Body:</span>
              <span className="label-text-alt text-xs">{request.body.length}</span>
            </div>
            <textarea
              className={`textarea textarea-bordered h-40 resize-y ${loading && "cursor-not-allowed"}`}
              readOnly={loading}
              placeholder="Body"
              name="body"
              id="body"
              value={request.body}
              onChange={(e) => setRequest((prevRequest) => ({ ...prevRequest, body: e.target.value }))}
            ></textarea>
          </label>
        )}
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText={"Hit"} />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {response && (
        <div className="p-1 md:p-4 flex gap-4 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-sm">Response:</span>
              <span className="label-text-alt text-xs">{response.status}</span>
            </div>
            <textarea className="textarea textarea-bordered h-40 resize-y" placeholder="Response" name="response" id="response" value={response.response} readOnly></textarea>
          </label>
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
