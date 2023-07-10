import React, { useContext } from "react";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import starIcon from "../../assets/star.png";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import "./SharedProfile.css";
import football from "../../assets/football.png";
import basketball from "../../assets/basketball.png";
import startDarkIcon from "../../assets/startFooter.svg";

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
          <span className="pe-3">
            <span
              className="pe-2"
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
            >
              2.658
            </span>
            Kisi abnone oldu
          </span>
          <img
            className=""
            src={`${currentTheme === "dark" ? startDarkIcon : starIcon}`}
            alt=""
            height={24}
            width={24}
          />
        </div>
        <div className="row">
          <div className="col d-flex position-relative">
            <div className="position-absolute">
              <img
                src={crown}
                alt=""
                height={19}
                width={19}
                style={{
                  background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                  borderRadius: "50%",
                  left: "3.2rem",
                  position: "absolute",
                }}
              />
            </div>
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
                  Expert
                </button>
              </div>
              <div className="blueTick-responsive align-items-center">
                melihaskar
                <img src={blueTick} alt="" width={16} height={16} />
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
              <img
                src={football}
                alt=""
                height={50}
                width={50}
                style={{ color: "#00C936" }}
              />
              <img
                src={basketball}
                alt=""
                height={50}
                width={50}
                style={{ color: "#FF9100" }}
              />
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
          <span className="pe-3">
            <span
              className="pe-2"
              style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6" }}
            >
              2.658
            </span>
            Kisi abnone oldu
          </span>
          <img
            className=""
            src={`${currentTheme === "dark" ? startDarkIcon : starIcon}`}
            alt=""
            height={24}
            width={24}
          />
        </div>
        <div className="row">
          <div className="col d-flex position-relative">
            <div className="position-absolute">
              <img
                src={crown}
                alt=""
                height={19}
                width={19}
                style={{
                  background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                  borderRadius: "50%",
                  left: "3.2rem",
                  position: "absolute",
                }}
              />
            </div>
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
                  Expert
                </button>
              </div>
              <div className="blueTick-responsive align-items-center">
                melihaskar
                <img src={blueTick} alt="" width={16} height={16} />
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
              <img
                src={football}
                alt=""
                height={50}
                width={50}
                style={{ color: "#00C936" }}
              />
              <img
                src={basketball}
                alt=""
                height={50}
                width={50}
                style={{ color: "#FF9100" }}
              />
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
