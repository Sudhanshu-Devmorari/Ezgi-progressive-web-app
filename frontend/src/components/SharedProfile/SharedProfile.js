import React, { useContext } from "react";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import starIcon from "../../assets/star-1.svg";
import CurrentTheme from "../../context/CurrentTheme";
import blueTick from "../../assets/blueTick.png";
import "./SharedProfile.css";
import football from "../../assets/Profile Card Football.svg";
import basketball from "../../assets/Profile Card Basketball.svg";
import startDarkIcon from "../../assets/star.svg";

const SharedProfile = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const editorProfile = [
    { name: "adnankeser", rate: "%67.5" },
    { name: "adnankeser", rate: "%67.5" },
    { name: "adnankeser", rate: "%67.5" },
  ];

  return (
    <>
      {editorProfile.map((res, index) => (
        <div
        onClick={() => props.setSelectContent("show-all-comments")}
          className={`card p-1 my-2 border-0 rounded-0 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="text-end mt-1">
            <span className="pe-2 shared-font" style={{fontSize:"13px"}}>
              <span
                className="pe-2"
                style={{
                  color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                }}
              >
                2.658
              </span>
              Kişi abone oldu
            </span>
            <img
              className=""
              src={`${currentTheme === "dark" ? startDarkIcon : starIcon}`}
              alt=""
              height={22}
              width={22}
            />
          </div>
          <div className="row">
            <div className="col pe-0 d-flex position-relative">
              <div className="position-absolute">
                <img
                  src={crown}
                  alt=""
                  height={21}
                  width={21}
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
                      fontSize: "13px",
                    }}
                  >
                    Expert
                  </button>
                </div>
                <div
                  className="blueTick-responsive align-items-center mt-1 responsive-username"
                  style={{ fontSize: "13px" }}
                >
                  <span className="pe-1">{res.name}</span>
                  <img
                    className="responsive-blue-tick"
                    src={blueTick}
                    alt=""
                    width={17}
                    height={17}
                  />
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  {res.rate}
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-end flex-column align-items-end me-3">
              <div className="mt-1">
                <img
                  src={football}
                  alt=""
                  height={38}
                  width={38}
                  style={{ color: "#00C936" }}
                />
                <img
                  src={basketball}
                  alt=""
                  height={38}
                  width={38}
                  style={{ color: "#FF9100" }}
                />
              </div>
              <div className="" style={{ fontSize: "12px" }}>
                <button
                  className="my-2 px-2 py-1"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #37FF80"
                        : "1px solid #00659D",
                    color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                    backgroundColor: "transparent",
                    borderRadius: "3px",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SharedProfile;
