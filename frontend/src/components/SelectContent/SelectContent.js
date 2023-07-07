import React, { useContext } from "react";
import publicIcon from "../../assets/publicIcon.svg";
import CurrentTheme from "../../context/CurrentTheme";
import "./SelectContent.css"

export const SelectContent = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex g-0 my-2 align-items-center p-1 responsive-font`}
      >
        <div
          className="p-2"
          style={{ color: props.selectContent === "for you" ? "#D2DB08" : "" }}
          onClick={() => props.setSelectContent("for you")}
        >
          For You
        </div>
        <div
          className="p-2"
          style={{ color: props.selectContent === "subscription" ? "#D2DB08" : "" }}
          onClick={() => props.setSelectContent("subscription")}
        >
          My Subscriptions
        </div>
        <div className="ms-auto p-2">
          <div className="d-flex align-items-center">
            <img
              src={publicIcon}
              alt=""
              style={{ color: "#007BF6" }}
              height={35}
              width={35}
            />
            <span className="px-2">Only Public</span>
            <div
              className={`${
                currentTheme === "dark"
                  ? "BlankCircle-dark-mode"
                  : "BlankCircle-light-mode"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
