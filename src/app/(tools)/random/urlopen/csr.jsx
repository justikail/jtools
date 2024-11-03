"use client";
import CardTools from "@/components/card/cardTools";
import { useState, useEffect } from "react";

function CSR() {
  const [url, setUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validUrl = url.trim() !== "";

    setIsDisabled(!validUrl);
  }, [url]);

  const openUrls = () => {
    const urlList = url
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    urlList.forEach((url) => {
      let trimmedUrl = url.trim();
      if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
        trimmedUrl = "http://" + trimmedUrl;
      }
      window.open(trimmedUrl, "_blank");
    });
  };

  return (
    <CardTools title="Bulk Url Opener" description="Bulk Url Opener, Open Unilimited Urls.">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-sm">URL List:</span>
          <span className="label-text-alt text-xs">{url.split("\n").length}</span>
        </div>
        <textarea className="textarea textarea-bordered h-40" placeholder="URL List" value={url} onChange={(e) => setUrl(e.target.value)}></textarea>
      </label>

      <div className="form-control mt-6">
        <button type="button" onClick={openUrls} className={`btn ${isDisabled ? "btn-disabled" : "btn-primary"} w-full`} disabled={isDisabled}>
          GO!
        </button>
      </div>
    </CardTools>
  );
}

export default CSR;
