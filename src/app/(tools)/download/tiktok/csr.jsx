"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import CollapseContainer from "@/components/collapse/collapseContainer";
import * as Uil from "@iconscout/react-unicons";
import { download } from "@/utils/openLink";
import { useEffect, useState, useRef } from "react";

function CSR() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid =
      url.trim() !== "" &&
      (url.trim().startsWith("http://tiktok.com/") ||
        url.trim().startsWith("https://tiktok.com/") ||
        url.trim().startsWith("http://www.tiktok.com/") ||
        url.trim().startsWith("https://www.tiktok.com/") ||
        url.trim().startsWith("https://vt.tiktok.com/") ||
        url.trim().startsWith("http://vt.tiktok.com/"));

    setIsDisabled(!isValid);
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);

    const response = await fetch("/api/tiktok-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
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
    <CardTools title="TikTok Downloader" description="Tools for download tiktok video, and audio or get information from tiktok video.">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 flex flex-col gap-4 w-full">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <Uil.UilLinkH size="16px" className="h-4 w-4 opacity-70" />
          <input type="text" className={`grow w-full ${loading && "cursor-not-allowed"}`} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://tiktok.com/" required readOnly={loading} />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText={"Submit"} />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && result.images && (
        <div className="flex flex-col gap-4 w-full p-1 md:p-4">
          {result.music && (
            <a className="btn btn-secondary w-full" href="#" onClick={() => download(`${encodeURIComponent(result.music)}`, `tiktok-bgm-${result.music_info.title || "unknown"}`, "mp3")} rel="noopener noreferrer" alt="Download (BGM)">
              Download (BGM)
            </a>
          )}
          <div className="bg-base-100 py-4 w-full rounded-lg">
            <div className="flex justify-center w-full items-center overflow-auto gap-4">
              {result.images.map((img, index) => (
                <img src={img} key={index} alt={`img-${index + 1}`} className="w-[300px] h-[440px] rounded-lg shadow-md shadow-base-content object-cover" />
              ))}
            </div>
          </div>
          <CollapseContainer title="Video Information" isOpen={true}>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Type:{" "}
                  <b className="text-primary">
                    <i>Photo</i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher:{" "}
                  <b className="text-primary">
                    <i>
                      {(
                        <a href={`https://www.tiktok.com/@${result.author.unique_id}`} rel="noreferrer nofollow" target="_blank" className="underline hover:no-underline">
                          {result.author.unique_id}
                        </a>
                      ) || "?"}
                    </i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher ID:{" "}
                  <b className="text-primary">
                    <i>{result.author.id || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher Name:{" "}
                  <b className="text-primary">
                    <i>{result.author.nickname || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Total Photo:{" "}
                  <b className="text-primary">
                    <i>{result.images.length}</i>
                  </b>
                </span>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Like:{" "}
                  <b className="text-primary">
                    <i>{result.digg_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Comment:{" "}
                  <b className="text-primary">
                    <i>{result.comment_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Share:{" "}
                  <b className="text-primary">
                    <i>{result.share_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Play:{" "}
                  <b className="text-primary">
                    <i>{result.play_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Save:{" "}
                  <b className="text-primary">
                    <i>{result.collect_count || "?"}</i>
                  </b>
                </span>
              </div>
            </div>
          </CollapseContainer>
          <CollapseContainer title="Audio Information" isOpen={false}>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Music:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.title || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Author:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.author || "?"}</i>
                  </b>
                </span>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Duration:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.duration || "?"}</i>
                  </b>
                </span>
              </div>
            </div>
          </CollapseContainer>
        </div>
      )}
      {result && !result.images && (
        <div className="flex flex-col gap-4 w-full p-1 md:p-4">
          {result.play && (
            <a className="btn btn-secondary w-full" href="#" onClick={() => download(`${encodeURIComponent(result.play)}`, `tiktok-by-${result.author.nickname || "unknown"}`, "mp4")} rel="noopener noreferrer" alt="Download (noWM)">
              Download (noWM)
            </a>
          )}
          {result.wmplay && (
            <a className="btn btn-secondary w-full" href="#" onClick={() => download(`${encodeURIComponent(result.wmplay)}`, `tiktok-by-${result.author.nickname || "unknown"}`, "mp4")} rel="noopener noreferrer" alt="Download (WM)">
              Download (WM)
            </a>
          )}
          {result.music && (
            <a className="btn btn-secondary w-full" href="#" onClick={() => download(`${encodeURIComponent(result.music)}`, `tiktok-bgm-${result.music_info.title || "unknown"}`, "mp3")} rel="noopener noreferrer" alt="Download (BGM)">
              Download (BGM)
            </a>
          )}
          <div className="flex justify-center items-center bg-base-100 py-4 rounded-lg">
            <img src={result.cover} alt={result.title} className="w-[300px] h-[440px] rounded-lg shadow-md shadow-base-content object-cover" />
          </div>
          <CollapseContainer title="Video Information" isOpen={true}>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Type:{" "}
                  <b className="text-primary">
                    <i>Video</i>
                  </b>
                </span>
                <span className="text-sm">
                  Duration:{" "}
                  <b className="text-primary">
                    <i>{result.duration || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher:{" "}
                  <b className="text-primary">
                    <i>
                      {(
                        <a href={`https://www.tiktok.com/@${result.author.unique_id}`} rel="noreferrer nofollow" target="_blank" className="underline hover:no-underline">
                          {result.author.unique_id}
                        </a>
                      ) || "?"}
                    </i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher ID:{" "}
                  <b className="text-primary">
                    <i>{result.author.id || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Publisher Name:{" "}
                  <b className="text-primary">
                    <i>{result.author.nickname || "?"}</i>
                  </b>
                </span>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Like:{" "}
                  <b className="text-primary">
                    <i>{result.digg_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Comment:{" "}
                  <b className="text-primary">
                    <i>{result.comment_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Share:{" "}
                  <b className="text-primary">
                    <i>{result.share_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Play:{" "}
                  <b className="text-primary">
                    <i>{result.play_count || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Save:{" "}
                  <b className="text-primary">
                    <i>{result.collect_count || "?"}</i>
                  </b>
                </span>
              </div>
            </div>
          </CollapseContainer>
          <CollapseContainer title="Audio Information" isOpen={false}>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Music:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.title || "?"}</i>
                  </b>
                </span>
                <span className="text-sm">
                  Author:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.author || "?"}</i>
                  </b>
                </span>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Duration:{" "}
                  <b className="text-primary">
                    <i>{result.music_info.duration || "?"}</i>
                  </b>
                </span>
              </div>
            </div>
          </CollapseContainer>
        </div>
      )}
    </CardTools>
  );
}

export default CSR;
