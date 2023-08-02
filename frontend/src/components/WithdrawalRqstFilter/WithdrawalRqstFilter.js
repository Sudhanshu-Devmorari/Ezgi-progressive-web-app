import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

const WithdrawalRqstFilter = () => {
    const [AllDropdown, setAllDropdown] = useState(false);
  return (
    <>
      <div className="d-flex p-2">
        <div className="p-2 flex-grow-1">
          <div class="input-group w-50">
            <span class="input-group-text search-icon-dark" id="basic-addon1">
              <GoSearch style={{ color: "#FFFFFF" }} />
            </span>
            <input type="text" className="input-field-dark" />
          </div>
        </div>
        <div className="p-2 position-relative">
          <button
            onClick={() => setAllDropdown(!AllDropdown)}
            style={{
              backgroundColor: "transparent",
              borderRadius: "3px",
              border: "1px solid #E6E6E6",
              color: "#E6E6E6",
              width: "7.5rem",
              borderBottom: AllDropdown
                ? "1px solid #0D2A53"
                : "1px solid #E6E6E6",
              borderLeft: AllDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderRight: AllDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderTop: AllDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
            }}
          >
            All
          </button>
          <div
            className={`position-absolute d-flex flex-column ${
              AllDropdown ? "d-block" : "d-none"
            }`}
            style={{
              backgroundColor: "#0B2447",
              border: "1px solid #E6E6E6",
              borderRadius: "3px",
              borderTop: "none",
            }}
          >
            <span
              className="m-1 px-2 py-1 text-center"
              style={{ backgroundColor: "#0D2A53", width: "6.9rem" }}
            >
              Pendings
            </span>
            <span
              className="m-1 px-2 py-1 text-center"
              style={{ backgroundColor: "#0D2A53", width: "6.9rem" }}
            >
              Approveds
            </span>
            <span
              className="m-1 px-2 py-1 text-center"
              style={{ backgroundColor: "#0D2A53", width: "6.9rem" }}
            >
              Rejecteds
            </span>
          </div>
        </div>
        <div className="p-2">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="px-3"
            style={{
              backgroundColor: "transparent",
              borderRadius: "4px",
              border: "1px solid #58DEAA",
              color: "#58DEAA",
            }}
          >
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default WithdrawalRqstFilter;
