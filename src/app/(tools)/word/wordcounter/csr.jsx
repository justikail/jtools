"use client";
import CardTools from "@/components/card/cardTools";
import { useState } from "react";

function CSR() {
  const [text, setText] = useState("");

  return (
    <CardTools title="Word Counter" description="Tools untuk menghitung jumlah spasi, paragraf, character dan lainnya.">
      <form className="flex flex-col gap-4 w-full p-1 md:p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Text:</span>
            <span className="label-text-alt">{text.length}</span>
          </div>
          <textarea className="textarea textarea-bordered h-52 resize-y" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        </label>
      </form>
      <div className="divider my-0"></div>
      <div className="flex flex-col md:flex-row w-full justify-center gap-2">
        <span className="w-full text-center bg-base-300 rounded-md py-2">Total Kata: {text.trim().split(/\s+/).filter(Boolean).length}</span>
        <span className="w-full text-center bg-base-300 rounded-md py-2">Total Karakter: {text.length}</span>
        <span className="w-full text-center bg-base-300 rounded-md py-2">
          Total Kalimat:{" "}
          {
            text
              .trim()
              .split(/[.!?]+/)
              .filter(Boolean).length
          }
        </span>
        <span className="w-full text-center bg-base-300 rounded-md py-2">
          Total Paragraf:{" "}
          {
            text
              .trim()
              .split(/[\r\n]+/g)
              .filter(Boolean).length
          }
        </span>
      </div>
    </CardTools>
  );
}

export default CSR;
