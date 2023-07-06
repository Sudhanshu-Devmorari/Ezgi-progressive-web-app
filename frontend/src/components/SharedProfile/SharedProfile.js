import React, { useContext } from "react";
import profile from "../../assets/profile.png";
import starIcon from "../../assets/star.png";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";

const SharedProfile = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`card border-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } m-2`}
      >
        <div className="text-end">
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
          <div className="col">
            <div className="row">
              <div className="col-5">
                <img src={profile} width={75} height={75} alt="" />
              </div>
              <div className="col-6 ps-0">
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
                <span className="p-1">melihaskar</span>
                <img src={blueTick} alt="" width={17} height={17} />
                <span
                  className="text-center ps-1"
                  style={{
                    fontSize: "1.2rem",
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  %67.6
                </span>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end flex-column align-items-end">
            <div className="mt-2">
              <RiFootballLine
                style={{ color: "#00C936" }}
                fontSize={"2.1rem"}
              />
              <CiBasketball style={{ color: "#FF9100" }} fontSize={"2.1rem"} />
            </div>
            <div className="mt-1">
            <button style={{
                  border: currentTheme === "dark" ? "1px solid #37FF80" : "1px solid #00659D",
                  color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                  backgroundColor: "transparent",
                }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedProfile;

