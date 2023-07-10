import React, { useContext } from "react";
import publicIcon from "../../assets/publicIcon.svg";
import CurrentTheme from "../../context/CurrentTheme";
import { CiSearch } from "react-icons/ci";
import "./SelectContentForEditorPage.css";

const SelectContentForEditorPage = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex g-0 my-2 align-items-center p-1 responsive-font`}
      >
        <div className="d-flex">
          <i
            className={`fa-solid fa-magnifying-glass ${
              currentTheme === "dark" ? "icon-dark" : "icon-light"
            }`}
          ></i>
          <input
            className={`${
              currentTheme === "dark" ? "input-field-dark" : "input-field-light"
            }`}
            type="text"
          />
        </div>

        <div className={`${props.editor && "ms-auto"} p-2`}>
          <button
            className="px-2 py-1"
            style={{
              border:
                currentTheme === "dark"
                  ? "1px solid #E6E6E6"
                  : "1px solid #0D2A53",
              color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
              backgroundColor: "transparent",
            }}
          >
            Filtre
          </button>
        </div>
        {props.comments && (
          <div className="ms-auto d-flex align-items-center">
            <img
              src={publicIcon}
              alt=""
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
              height={37}
              width={37}
            />
            <span className="pe-1">Only Public</span>
            <div
              style={{
                border:
                  currentTheme === "dark"
                    ? "2px solid #E6E6E6"
                    : "2px solid #0D2A53",
                borderRadius: "50%",
                width: "2.2rem",
                height: "2.1rem",
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectContentForEditorPage;
