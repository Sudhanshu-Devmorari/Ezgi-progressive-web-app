import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star.png";
import likeIcondark from "../../assets/LikeDark.png";
import starIcondark from "../../assets/StarDark.png";
import clapIcon from "../../assets/clap.png";
import publicIcon from "../../assets/publicIcon.svg";
import TurkeyFalg from "../../assets/flagTurk.png";
import "./ContentSection.css";

const ContentSection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`card border-0 rounded-0 mb-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="row m-2">
          <div className="position-relative">
            <img
              src={crown}
              alt=""
              height={19}
              width={19}
              style={{
                background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                borderRadius: "50%",
                left: "4rem",
                position: "absolute",
              }}
            />
            <div className="col">
              <img src={profile} width={75} height={75} alt="" />
              <span className="p-1">melihaskar</span>
              <img src={blueTick} alt="" width={15} height={15} />
            </div>
          </div>
          <div className="col">
            <div
              className="d-flex justify-content-end"
              style={{ minHeight: "28px" }}
            >
              {props.selectContent === "for you" && (
                <button
                  className="px-3"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #4DD5FF"
                        : "1px solid #007BF6",
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="d-flex justify-content-between text-center mt-1">
              <div className="">
                <div>Success Rate</div>
                <div style={{ fontSize: "1.2rem", color: "#00659D" }}>
                  %67.6
                </div>
              </div>
              <div className="">
                <div>Success Rate</div>
                <div style={{ fontSize: "1.2rem", color: "#FFA200" }}>275</div>
              </div>
            </div>
          </div>
          <div
            className="p-1 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quas
            eligendi cupiditate voluptates minima consequatur. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Error quas eligendi
            cupiditate voluptates minima consequatur.
          </div>
          <div
            className="p-1"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <img
                  className="pe-1"
                  src={TurkeyFalg}
                  alt=""
                  height={25}
                  width={27}
                />
                Super Lig
              </span>
              <span className="pe-5">07.05.2023</span>
              <span>
                <img src={publicIcon} alt="" height={35} width={35} />
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span>Anajdshfuki</span>
              <div
                className="border-bottom-0"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "91px",
                  height: "47px",
                  borderRadius: " 50% / 100% 100% 0 0",
                  border:
                    currentTheme === "dark"
                      ? "1px solid #FFFFFF"
                      : "1px solid #0D2A53",
                }}
              >
                14:30
              </div>
              <span>Anajdshfuki</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span
                className="p-1"
                style={{ backgroundColor: "#00659D", color: "#FFFFFF" }}
              >
                FT - Home & 2.5 Over 2.40
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 align-items-center">
            <div className="">
              {currentTheme === "dark" ? (
                <span>
                  <img src={likeIcondark} alt="" height={20} width={20} /> 258
                </span>
              ) : (
                <span>
                  <img src={likeIcon} alt="" height={20} width={20} /> 258
                </span>
              )}
              {currentTheme === "dark" && (
                <span className="px-2">
                  <img src={starIcondark} alt="" height={20} width={20} /> 258
                </span>
              )}
              {currentTheme === "light" && (
                <span className="px-2">
                  <img src={starIcon} alt="" height={20} width={20} /> 258
                </span>
              )}
              <span>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </span>
            </div>
            <div className="">
              {props.selectContent === "for you" && (
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
              )}
              <small className="ps-1">10k sub</small>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`card border-0 rounded-0 mb-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="row m-2">
          <div className="position-relative">
            <img
              src={crown}
              alt=""
              height={19}
              width={19}
              style={{
                background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                borderRadius: "50%",
                left: "4rem",
                position: "absolute",
              }}
            />
            <div className="col">
              <img src={profile} width={75} height={75} alt="" />
              <span className="p-1">melihaskar</span>
              <img src={blueTick} alt="" width={15} height={15} />
            </div>
          </div>
          <div className="col">
            <div
              className="d-flex justify-content-end"
              style={{ minHeight: "28px" }}
            >
              {props.selectContent === "for you" && (
                <button
                  className="px-3"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #4DD5FF"
                        : "1px solid #007BF6",
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="d-flex justify-content-between text-center mt-1">
              <div className="">
                <div>Success Rate</div>
                <div style={{ fontSize: "1.2rem", color: "#00659D" }}>
                  %67.6
                </div>
              </div>
              <div className="">
                <div>Success Rate</div>
                <div style={{ fontSize: "1.2rem", color: "#FFA200" }}>275</div>
              </div>
            </div>
          </div>
          <div
            className="p-1 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quas
            eligendi cupiditate voluptates minima consequatur. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Error quas eligendi
            cupiditate voluptates minima consequatur.
          </div>
          <div
            className="p-1"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <img
                  className="pe-1"
                  src={TurkeyFalg}
                  alt=""
                  height={25}
                  width={27}
                />
                Super Lig
              </span>
              <span className="pe-5">07.05.2023</span>
              <span>
                <img src={publicIcon} alt="" height={35} width={35} />
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span>Anajdshfuki</span>
              <div
                className="border-bottom-0"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "91px",
                  height: "47px",
                  borderRadius: " 50% / 100% 100% 0 0",
                  border:
                    currentTheme === "dark"
                      ? "1px solid #FFFFFF"
                      : "1px solid #0D2A53",
                }}
              >
                14:30
              </div>
              <span>Anajdshfuki</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span
                className="p-1"
                style={{ backgroundColor: "#00659D", color: "#FFFFFF" }}
              >
                FT - Home & 2.5 Over 2.40
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 align-items-center">
            <div className="">
              {currentTheme === "dark" ? (
                <span>
                  <img src={likeIcondark} alt="" height={20} width={20} /> 258
                </span>
              ) : (
                <span>
                  <img src={likeIcon} alt="" height={20} width={20} /> 258
                </span>
              )}
              {currentTheme === "dark" && (
                <span className="px-2">
                  <img src={starIcondark} alt="" height={20} width={20} /> 258
                </span>
              )}
              {currentTheme === "light" && (
                <span className="px-2">
                  <img src={starIcon} alt="" height={20} width={20} /> 258
                </span>
              )}
              <span>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </span>
            </div>
            <div className="">
              {props.selectContent === "for you" && (
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
              )}
              <small className="ps-1">10k sub</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentSection;
