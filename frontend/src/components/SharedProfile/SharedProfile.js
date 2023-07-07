import React, { useContext } from "react";
import profile from "../../assets/profile.png";
import starIcon from "../../assets/star.png";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import "./SharedProfile.css";

const SharedProfile = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`card p-1 my-2 border-0 rounded-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="text-end mt-1">
          <span>
            <span
              className="pe-2"
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
            >
              2.658
            </span>
            sdhfg jhsdf jsduyf
          </span>
          <img className="ps-2" src={starIcon} alt="" height={20} width={27} />
        </div>
        <div className="row">
          <div className="col d-flex">
            <img src={profile} width={75} height={75} alt="" />
            <div className="d-flex flex-column ps-1">
              <div>
                <button
                  className="px-3"
                  style={{
                    border: "1px solid #FFA200",
                    color: "#FFA200",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                  }}
                >
                  Follow
                </button>
              </div>
              <div className="blueTick-responsive">
                melihaskar
                <img src={blueTick} alt="" width={17} height={17} />
              </div>
              <div
                style={{
                  fontSize: "1.2rem",
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                %67.6
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end flex-column align-items-end me-3">
            <div className="mt-2">
              <RiFootballLine
                style={{ color: "#00C936" }}
                fontSize={"2.1rem"}
              />
              <CiBasketball style={{ color: "#FF9100" }} fontSize={"2.1rem"} />
            </div>
            <div className="mt-1">
              <button
                className="my-2 px-2 py-1"
                style={{
                  border:
                    currentTheme === "dark"
                      ? "1px solid #37FF80"
                      : "1px solid #00659D",
                  color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                  backgroundColor: "transparent",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div
        className={`card p-1 my-2 border-0 rounded-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="text-end mt-1">
          <span>
            <span
              className="pe-2"
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
            >
              2.658
            </span>
            sdhfg jhsdf jsduyf
          </span>
          <img className="ps-2" src={starIcon} alt="" height={20} width={27} />
        </div>
        <div className="row">
          <div className="col d-flex">
            <img src={profile} width={75} height={75} alt="" />
            <div className="d-flex flex-column ps-1">
              <div>
                <button
                  className="px-3"
                  style={{
                    border: "1px solid #FFA200",
                    color: "#FFA200",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                  }}
                >
                  Follow
                </button>
              </div>
              <div className="blueTick-responsive">
                melihaskar
                <img src={blueTick} alt="" width={17} height={17} />
              </div>
              <div
                style={{
                  fontSize: "1.2rem",
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                %67.6
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end flex-column align-items-end me-3">
            <div className="mt-2">
              <RiFootballLine
                style={{ color: "#00C936" }}
                fontSize={"2.1rem"}
              />
              <CiBasketball style={{ color: "#FF9100" }} fontSize={"2.1rem"} />
            </div>
            <div className="mt-1">
              <button
                className="my-2 px-2 py-1"
                style={{
                  border:
                    currentTheme === "dark"
                      ? "1px solid #37FF80"
                      : "1px solid #00659D",
                  color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                  backgroundColor: "transparent",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedProfile;
