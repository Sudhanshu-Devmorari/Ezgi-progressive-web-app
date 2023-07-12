import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import starIcon from "../../assets/star.png";
import { BsArrowLeft } from "react-icons/bs";
import { LiaLiraSignSolid } from "react-icons/lia";
import basketball from "../../assets/basketball.png";
import football from "../../assets/football.png";
import icon from "../../assets/₺.svg";
import icon_1 from "../../assets/₺ (1).svg";
import "./ActiveComments.css"

const ActiveComments = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`card border-0 rounded-0 my-2 p-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="d-flex justify-content-between pb-2">
          <BsArrowLeft
            onClick={() => props.setSelectContent("home")}
            fontSize={"1.6rem"}
          />
          <img src={starIcon} alt="" height={25} width={25} />
        </div>
        <div className="row">
          <div className="col pe-0 d-flex position-relative">
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
            <img src={profile} width={100} height={100} alt="" />
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
              <div className="blueTick-responsive align-items-center mt-1 responsive-username">
                melih1905
                <img
                  className="responsive-blue-tick"
                  src={blueTick}
                  alt=""
                  width={19}
                  height={19}
                />
              </div>
              <div style={{ fontSize: "12px", color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53" }}>
                Ankara/Turkiye
              </div>
              <div style={{ fontSize: "12px", color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53" }}>
                22.05.2022
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end gap-2">
              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>256</span>
                <span style={{ fontSize: "12px",color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53" }}>
                  Abone
                </span>
              </div>

              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>256</span>
                <span style={{ fontSize: "12px",color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53" }}>
                  Takipci
                </span>
              </div>

              <div className="flex-column d-flex ">
                <span style={{ fontSize: "1.2rem" }}>256</span>
                <span style={{ fontSize: "12px",color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53" }}>
                  Yorum
                </span>
              </div>
            </div>
            <div className="mt-2 d-flex justify-content-end">
              <button
                style={{
                  border:
                    currentTheme === "dark"
                      ? "1px solid #4DD5FF"
                      : "1px solid #007BF6",
                  color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                  backgroundColor: "transparent",
                  borderRadius: "18px",
                  padding: "0.2rem 2.4rem",
                  fontSize: "13px",
                }}
              >
                Follow
              </button>
            </div>
          </div>
        </div>
        <div
          className="p-1 my-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "14px",
          }}
        >
          2012 yılından beri profesyonel olarak maçları takip ediyorum. Premier
          lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için teşekkürler.
          2012 yılından beri profesyonel olarak maçları takip ediyorum. Premier
          lig konusunda uzmanım. Yorumlarımı takip ettiğiniz için teşekkürler.
        </div>
        <div className="row g-0 text-center my-2 gap-1">
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Success Rate
            </span>
            <span style={{ fontSize: "1.2rem", color: "#D2DB08" }}>%67.6</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Score Points
            </span>
            <span style={{ fontSize: "1.2rem", color: "#FFA200" }}>1.356</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              Winning
            </span>
            <span style={{ fontSize: "1.2rem", color: "#37FF80" }}>256</span>
          </div>
          <div className="col d-flex flex-column">
            <span
              className="py-1 px-2 success-rate-font"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                // fontSize: "11px",
              }}
            >
              Lose
            </span>
            <span style={{ fontSize: "1.2rem", color: "#FF5757" }}>256</span>
          </div>
        </div>
        <div
          className="d-flex align-items-center ps-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="flex-grow-1">Category</div>
          <div className="">
            <img src={basketball} alt="" height={45} width={45} />
          </div>
          <div className="">
            <img src={football} alt="" height={45} width={45} />
          </div>
        </div>
        <div
          className="d-flex justify-content-between p-2 my-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Average Odds</div>
          <div className="py-1">1.80</div>
        </div>
        <div
          className="d-flex justify-content-between p-2"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <div className="py-1">Leagues</div>
          <div className="py-1">UK Premier League + 3</div>
        </div>
        <div className="d-flex justify-content-center align-items-center my-3">
          Month/29.90{" "}
          <LiaLiraSignSolid
            fontSize={"1.2rem"}
            color={`${currentTheme === "dark" ? "E6E6E6" : "#0D2A53"}`}
            style={{marginBottom:"4px"}}
          />
          <button
            className="ms-1 px-3 py-1"
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
    </>
  );
};

export default ActiveComments;
