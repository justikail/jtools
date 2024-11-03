"use client";
import BtnSubmit from "@/components/button/btnSubmit";
import CardTools from "@/components/card/cardTools";
import { useState, useEffect, useRef } from "react";

function CSR() {
  const [state, setState] = useState({
    search: "",
    option: "1",
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const resultRef = useRef(null);

  useEffect(() => {
    const isValid = state.search.trim() !== "" && ["1", "2"].includes(state.option);

    setIsDisabled(!isValid);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsDisabled(true);
    setResult(null);
    setError(null);
    setCurrentPage(1);

    const response = await fetch("/api/mahasiswa", {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result?.list?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(result?.list?.length / itemsPerPage);

  return (
    <CardTools title="Cari Mahasiswa & Dosen" description="Tools untuk mencari mahasiswa & dosen berdasarkan nama, nim ataupun nidn.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 md:p-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Option:</span>
          </div>
          <select value={state.option} onChange={(e) => setState({ ...state, option: e.target.value })} className={`select select-bordered ${loading && "cursor-not-allowed"}`} disabled={loading}>
            <option defaultValue>Pick one</option>
            <option value="1">Mahasiswa</option>
            <option value="2">Dosen</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Search:</span>
          </div>
          <input
            type="text"
            placeholder="Nama/NIM/NIDN"
            value={state.search}
            onChange={(e) => setState({ ...state, search: e.target.value })}
            className={`input input-bordered w-full ${loading && "cursor-not-allowed"}`}
            readOnly={loading}
          />
        </label>
        <BtnSubmit loading={loading} isDisabled={isDisabled} innerText="Cari" />
      </form>
      <div className="divider my-0" ref={resultRef}></div>
      {error && <span className="w-full text-error">{error}</span>}
      {result && result.option == "1" && (
        <>
          <div className="w-full max-w-[230px] md:max-w-full mx-auto border rounded-md flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full p-4">
              <h1 className="text-yellow-500">Mahasiswa</h1>
              <label className="flex w-full max-w-fit max-h-fit">
                <select className="select select-bordered" value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </label>
            </div>
            <div className="overflow-x-auto w-full border border-l-0 border-r-0 rounded-md">
              <table className="table table-zebra">
                <thead className="border-b-white">
                  <tr>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>PT</th>
                    <th>PRODI</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <a href={`https://pddikti.kemdikbud.go.id/detail-mahasiswa/${item.id}`} target="_blank" rel="noreferrer nofollow" className="hover:text-white underline hover:no-underline">
                          {item.nama || "?"}
                        </a>
                      </td>
                      <td>{item.nim || "?"}</td>
                      <td>{item.sinkatan_pt || "?"}</td>
                      <td>{item.nama_prodi || "?"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="join w-full grid grid-cols-2">
            <button className="join-item btn btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              Prev
            </button>
            <button className="join-item btn btn-outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </>
      )}
      {result && result.option == "2" && (
        <>
          <div className="w-full max-w-[230px] md:max-w-full mx-auto border rounded-md flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full p-4">
              <h1 className="text-yellow-500">Dosen</h1>
              <label className="flex w-full max-w-fit max-h-fit">
                <select className="select select-bordered" value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </label>
            </div>
            <div className="overflow-x-auto w-full border border-l-0 border-r-0 rounded-md">
              <table className="table table-zebra">
                <thead className="border-b-white">
                  <tr>
                    <th>Nama</th>
                    <th>NIDN</th>
                    <th>PT</th>
                    <th>PRODI</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <a href={`https://pddikti.kemdikbud.go.id/detail-mahasiswa/${item.id}`} target="_blank" rel="noreferrer nofollow" className="hover:text-white underline hover:no-underline">
                          {item.nama || "?"}
                        </a>
                      </td>
                      <td>{item.nidn || "?"}</td>
                      <td>{item.sinkatan_pt || "?"}</td>
                      <td>{item.nama_prodi || "?"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="join w-full grid grid-cols-2">
            <button className="join-item btn btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              Prev
            </button>
            <button className="join-item btn btn-outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </CardTools>
  );
}

export default CSR;
