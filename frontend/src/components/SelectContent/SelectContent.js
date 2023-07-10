import React, { useContext } from "react";
import publicIcon from "../../assets/publicIcon.svg";
import CurrentTheme from "../../context/CurrentTheme";
import "./SelectContent.css";

export const SelectContent = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const userPhone = localStorage.getItem("userPhone");
  console.log("userPhone: ",userPhone)
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex g-0 my-2 align-items-center p-1 responsive-font`}
      >
        {userPhone ? (
          <>
            <div
              className="p-2"
              style={{
                color: props.selectContent === "for you" ? "#D2DB08" : "",
              }}
              onClick={() => props.setSelectContent("for you")}
            >
              For You
            </div>
            <div
              className="p-2"
              style={{
                color: props.selectContent === "subscription" ? "#D2DB08" : "",
              }}
              onClick={() => props.setSelectContent("subscription")}
            >
              My Subscriptions
            </div>
          </>
        ): null}
        <div className={`${userPhone ? "text-end ms-auto py-1 px-2" : "ms-auto py-1 px-2"}`}>
          <div className="d-flex align-items-center">
            <img
              src={publicIcon}
              alt=""
              style={{ color: "#007BF6" }}
              height={43}
              width={43}
            />
            <span className="pe-2">Only Public</span>
            <div
              style={{
                border:
                  currentTheme === "dark"
                    ? "2px solid #4DD5FF"
                    : "2px solid #007BF6",
                borderRadius: "50%",
                width: "2.2rem",
                height: "2.1rem",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
