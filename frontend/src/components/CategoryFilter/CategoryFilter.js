import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import { UserId } from "../GetUser";
import world_check from "../../assets/world-check.svg";
import world_check_light from "../../assets/world-check.png";
import darkGrp from "../../assets/Public Content Radio Button Unselected.svg";
import publicSelectedIcon from "../../assets/Public Content Radio Button Selected.svg";
import lighGrpSelected from "../../assets/Group 312.png";
import lighGrp from "../../assets/Group 721.png";

const CategoryFilter = (props) => {
  const userId = UserId()
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      {userId ? (
        <div
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } d-flex g-0 my-2 align-items-center p-1 responsive-font`}
        >
          {userId ? (
            <>
              <div className="input-group flex-nowrap" style={{ width: "38%" }}>
                <span
                  className={`input-group-text ${
                    currentTheme === "dark"
                      ? "search-icon-dark"
                      : "search-icon-light"
                  }`}
                  id="basic-addon1"
                >
                  <i
                    className={`fa-solid fa-magnifying-glass`}
                    style={{
                      color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                    }}
                  ></i>
                </span>
                <input
                  onChange={(e) => {
                    props?.filterCategoryData(e.target.value);
                  }}
                  type="text"
                  className={` ${
                    currentTheme === "dark"
                      ? "input-field-dark"
                      : "input-field-light"
                  }`}
                />
              </div>
            </>
          ) : null}
          <div className="text-end ms-auto py-1 px-2">
            <div className="d-flex align-items-center">
              <img
                src={`${
                  currentTheme === "dark" ? world_check : world_check_light
                }`}
                alt=""
                style={{ color: "#007BF6" }}
                height={31}
                width={31}
              />
              <span className="pe-2" style={{ width: "max-content" }}>
                Only Public
              </span>
              <img
                onClick={() => {
                  props?.setOnlyPubliccategory(!props?.onlyPubliccategory);
                }}
                src={
                  currentTheme === "dark"
                    ? props?.onlyPubliccategory
                      ? publicSelectedIcon
                      : darkGrp
                    : props?.onlyPubliccategory
                    ? lighGrpSelected
                    : lighGrp
                }
                alt=""
                height={28}
                width={28}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CategoryFilter;
