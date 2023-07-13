import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star-1.svg";
import likeIcondark from "../../assets/LikeDark.png";
import starIcondark from "../../assets/StarDark.png";
import clapIcon from "../../assets/clap.png";
import publicIcon from "../../assets/publicIcon.svg";
import world_check from "../../assets/world-check.svg";
import TurkeyFalg from "../../assets/flagTurk.png";
import lock from "../../assets/lock.svg";
import darklock from "../../assets/darklock.svg";
import "./ContentSection.css";
import { Link } from "react-router-dom";

const ContentSection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const userPhone = localStorage.getItem("userPhone");
  return (
    <>
      <div
        className={`card border-0 rounded-0 mb-2 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="row m-2">
          <div className="position-relative col p-0">
            <img
              src={crown}
              alt=""
              height={19}
              width={19}
              style={{
                background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                borderRadius: "50%",
                left: "3.3rem",
                position: "absolute",
              }}
            />
            <div className="col">
              <img src={profile} width={75} height={75} alt="" />
              <span className="p-1 autorname-responsive">melihaskar</span>
              <img src={blueTick} alt="" width={14} height={14} />
            </div>
          </div>
          <div className="col p-0">
            {props.selectContent === "for you" && (
              <div className="d-flex justify-content-end pe-2">
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
            )}
            <div
              className={`${
                props.selectContent === "for you" ? "mt-3" : "mt-5"
              } row gap-1 g-0 text-center`}
            >
              <div className="col">
                <div className="rate-fonts">Success Rate</div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  %67.6
                </div>
              </div>
              <div className="col">
                <div className="rate-fonts">Score Points</div>
                <div style={{ fontSize: "1.2rem", color: "#FFA200" }}>256</div>
              </div>
            </div>
          </div>


          {userPhone === null ? (
            <>
              <div
            className="px-2 py-3 my-2 d-flex justify-content-center"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            }}
          >
            <img
              src={`${currentTheme === "dark" ? lock : darklock}`}
              alt=""
              height={35}
              width={35}
            />
          </div>
            </>
          ) : (
            <>
              <div
                onClick={() => props.setSelectContent("active-comments")}
                className="p-1 my-2"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  fontSize: "14px",
                }}
              >
                2012 yılından beri profesyonel olarak maçları takip ediyorum.
                Premier lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için
                teşekkürler. 2012 yılından beri profesyonel olarak maçları takip
                ediyorum. Premier lig konusunda uzmanım. Yorumlarımı takip
                ettiğiniz için teşekkürler.
              </div>
            </>
          )}


          
          <div
            className="p-1"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              fontSize: "14px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center gap-1">
              <span>
                <img
                  className="pe-1"
                  src={TurkeyFalg}
                  alt=""
                  height={25}
                  width={27}
                />
                <span className="ps-1">Super Lig</span>
              </span>
              <span style={{paddingRight:"49px"}}>07.05.2023</span>
              <span>{userPhone === null ? null : (
                  <img src={`${currentTheme === "dark" ? world_check : publicIcon}`} alt="" height={35} width={35} />
                )}</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span>Antalyaspor</span>
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
              <span>Başakşehir</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span
                className="p-1"
                style={{
                  backgroundColor:
                    props.SelectComment === "resolvedComments"
                      ? "#00DE51"
                      : "#00659D",
                  color:
                    props.SelectComment === "resolvedComments"
                      ? "#0D2A53"
                      : "#FFFFFF",
                  fontSize: "12px",
                }}
              >
                FT - Home & 2.5 Over 2.40
              </span>
            </div>
          </div>

          <div className="d-flex mt-2 align-items-center">
            <div className="gap-2 d-flex">
              <div>
                <img
                  src={`${currentTheme === "dark" ? likeIcondark : likeIcon}`}
                  alt=""
                  height={20}
                  width={20}
                />{" "}
                258
              </div>
              <div>
                <img
                  src={`${currentTheme === "dark" ? starIcondark : starIcon}`}
                  alt=""
                  height={22}
                  width={22}
                />{" "}
                258
              </div>
              <div>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </div>
            </div>
            <div className="ms-auto" style={{ fontSize: "12px" }}>
            {props.selectContent === "for you" && (
                <button
                  className="me-2 px-2 py-1"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #37FF80"
                        : "1px solid #00659D",
                    color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                    backgroundColor: "transparent",
                    borderRadius:"3px"
                  }}
                >
                  Subscribe
                </button>
              )}
              10 dk önce
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentSection;
