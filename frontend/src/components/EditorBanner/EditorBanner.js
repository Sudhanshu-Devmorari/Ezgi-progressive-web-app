import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import "./EditorBanner.css"

export const EditorBanner = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div className={`row g-0 bannerText font-responsive`}>
        <div
          className={`col-3 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="d-flex flex-column my-2 mt-3">
            <div className=" d-flex justify-content-center">FootBall</div>
            <div className="p-2 d-flex justify-content-center">
              <RiFootballLine
                style={{ color: "#00C936" }}
                fontSize={"1.8rem"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#00C936" }}>2.655 </span>Yorum
              </span>
            </div>
          </div>
        </div>
        <div
          className={`col-3 mx-2 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="d-flex g-0 flex-column my-2 mt-3">
            <div className="d-flex justify-content-center">Basketball</div>
            <div className="p-2 d-flex justify-content-center">
              <CiBasketball style={{ color: "#FF9100" }} fontSize={"1.8rem"} />
            </div>
            <div className="d-flex justify-content-center">
              <span>
                <span style={{ color: "#FF9100" }}>2.655 </span>Yorum
              </span>
            </div>
          </div>
        </div>
        <div
          className={`col-5 d-flex align-items-center justify-content-center ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ color: "#D2DB08" }}
        >
          Become a Editor Banner
        </div>
      </div>
    </>
  );
};
