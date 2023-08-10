import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import "./SupportManagementFilter.css";

const SupportManagementFilter = () => {
  const options = ["All", "Pendings", "Resolved", "Redirected"];

  const [selectedOption, setSelectedOption] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="d-flex p-2" style={{ fontSize: "1.1rem" }}>
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
            onClick={()=>setShowDropdown(!showDropdown)}
            style={{
              backgroundColor: "transparent",
              borderRadius: "3px",
              border: "1px solid #E6E6E6",
              color: "#E6E6E6",
              width: "7.5rem",
              borderBottom: showDropdown
                ? "1px solid #0D2A53"
                : "1px solid #E6E6E6",
              borderLeft: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderRight: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderTop: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
            }}
          >
            {selectedOption}
          </button>
          <div
            className={`position-absolute d-flex flex-column ${
              showDropdown ? "d-block" : "d-none"
            }`}
            style={{
              backgroundColor: "#0B2447",
              border: "1px solid #E6E6E6",
              borderRadius: "3px",
              borderTop: "none",
            }}
          >
            {options
              .filter((option) => option !== selectedOption)
              .map((option) => (
                <span
                  key={option}
                  className="m-1 px-2 py-1 text-center cursor"
                  style={{ backgroundColor: "#0D2A53", width: "6.9rem" }}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </span>
              ))}
          </div>
        </div>
        <div className="p-2">
          <button
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

export default SupportManagementFilter;
