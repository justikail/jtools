import { useEffect, useRef, useMemo, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import * as Uil from "@iconscout/react-unicons";

function SSR({ options }) {
  const [ext, setExt] = useState("png");
  const resultRef = useRef(null);
  const qrCode = useMemo(() => new QRCodeStyling(options), [options]);

  useEffect(() => {
    if (resultRef.current) {
      qrCode.append(resultRef.current);
    }
  }, [qrCode]);

  useEffect(() => {
    if (resultRef.current) {
      qrCode.update(options);
    }
  }, [qrCode, options]);

  const handleDownload = (e) => {
    e.preventDefault();
    qrCode.download({ name: "QRCode", extension: ext });
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="mask mask-square w-[200px] h-[200px]" title="QRCode" ref={resultRef}></div>
      <div className="flex flex-col w-[200px] gap-2">
        <button type="button" className="btn btn-sm w-full justify-center items-center" onClick={handleDownload}>
          <Uil.UilImport size="16px" className="opacity-70" /> Download
        </button>
        <select className="select select-sm select-bordered w-full" value={ext} onChange={(e) => setExt(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
          <option value="svg">SVG</option>
        </select>
      </div>
    </div>
  );
}

export default SSR;
