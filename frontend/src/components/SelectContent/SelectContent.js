import React, { useContext, useState } from "react";
import world_check from "../../assets/world-check.svg";
import world_check_light from "../../assets/world-check.png";
import CurrentTheme from "../../context/CurrentTheme";
import "./SelectContent.css";
import darkGrp from "../../assets/Public Content Radio Button Unselected.svg";
import publicSelectedIcon from "../../assets/Public Content Radio Button Selected.svg";
import lighGrpSelected from "../../assets/Group 312.png";
import lighGrp from "../../assets/Group 721.png";

export const SelectContent = (props) => {
  const { handleOnlyPublicData } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const userPhone = localStorage.getItem("userPhone");
  const userId = localStorage.getItem("user-id");
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
              <div
                className="p-2"
                style={{
                  color: props.selectContent === "for you" ? "#D2DB08" : "",
                }}
                onClick={() => {
                  props.setSelectContent("for you");
                  props.setPublicSelected(false);
                }}
              >
                For You
              </div>
              <div
                className="p-2"
                style={{
                  color:
                    props.selectContent === "subscription" ? "#D2DB08" : "",
                }}
                onClick={() => {
                  props.setSelectContent("subscription");
                  props.setPublicSelected(false);
                }}
              >
                My Subscriptions
              </div>
            </>
          ) : null}
          <div
            className={`${
              userPhone ? "text-end ms-auto py-1 px-2" : "ms-auto py-1 px-2"
            }`}
          >
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
              {/* {console.log(props.publicSelected)} */}
              <div
                onClick={() => {
                  handleOnlyPublicData(props.publicSelected);
                  props.setPublicSelected(!props.publicSelected);
                  props.publicSelected == true
                    ? props.setSelectContent("for you")
                    : props.setSelectContent("only public");
                }}
              >
                <img
                  src={
                    currentTheme === "dark"
                      ? props.publicSelected
                        ? publicSelectedIcon
                        : darkGrp
                      : props.publicSelected
                      ? lighGrpSelected
                      : lighGrp
                  }
                  // src={currentTheme === "dark" ? darkGrp : lighGrp}
                  alt=""
                  height={28}
                  width={28}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
