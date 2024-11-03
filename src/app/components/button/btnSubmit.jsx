import React from "react";

function BtnSubmit({ isDisabled, loading, innerText }) {
  return (
    <div className="form-control mt-6">
      <button type="submit" className={`btn ${isDisabled ? "btn-disabled" : "btn-primary"} w-full`} disabled={isDisabled}>
        {loading ? <span className="loading loading-spinner"></span> : innerText}
      </button>
    </div>
  );
}

export default BtnSubmit;
