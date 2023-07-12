import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star-1.svg";
import likeIcondark from "../../assets/LikeDark.png";
import starIcondark from "../../assets/star.svg";
import clapIcon from "../../assets/clap.png";
import publicIcon from "../../assets/publicIcon.svg";
import publicDark from "../../assets/world-check.svg";
import TurkeyFalg from "../../assets/flagTurk.png";
import lock from "../../assets/lock.svg";
import darklock from "../../assets/darklock.svg";
import circle_check from "../../assets/circle-check.svg";
import clock_pause from "../../assets/clock-pause.svg";
import circle_x from "../../assets/circle-x.svg";
import { Link } from "react-router-dom";
import "./CommentsContentSection.css";

const CommentsContentSection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
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
            {props.SelectComment === "resolvedComments" && (
              <div className="d-flex justify-content-end pe-2">
                <img src={`${currentTheme === "dark" ? publicDark : publicIcon}`} alt="" height={31} width={31}/>
                {/* <img src={publicIcon} alt="" height={35} width={35}/> */}
                <img src={circle_check} alt="" height={31} width={31}/>
              </div>
            )}
            <div className={`${props.SelectComment === "activeComments" ? "mt-5" : "mt-3"} row gap-1 g-0 text-center`}>
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
          <div
            className="p-1 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              fontSize: "14px",
            }}
          >
            2012 yılından beri profesyonel olarak maçları takip ediyorum.
            Premier lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için
            teşekkürler. 2012 yılından beri profesyonel olarak maçları takip
            ediyorum. Premier lig konusunda uzmanım. Yorumlarımı takip ettiğiniz
            için teşekkürler.
          </div>
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
              <span style={{paddingRight: props.SelectComment === "activeComments" ? "83px" : "83px"}}>07.05.2023</span>
              <span>
              </span>
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
                    props.SelectComment === "activeComments"
                      ? currentTheme === "dark"
                        ? "1px solid #FFFFFF"
                        : "1px solid #0D2A53"
                      : "1px solid #00DE51",
                }}
              >
                {props.SelectComment === "resolvedComments" && "3 - 1"}
                {props.SelectComment === "activeComments" && "14:30"}
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
                  color: props.SelectComment === "resolvedComments" ? "#0D2A53" : "#FFFFFF",
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
                  height={25}
                  width={25}
                />{" "}
                258
              </div>
              <div>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </div>
            </div>
            <div className="ms-auto" style={{ fontSize: "12px" }}>
              10 dk önce
            </div>
          </div>
        </div>
      </div>

      {props.SelectComment === "resolvedComments" && (
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
          {props.SelectComment === "resolvedComments" && (
              <div className="d-flex justify-content-end pe-2">
                <img src={`${currentTheme === "dark" ? publicDark : publicIcon}`} alt="" height={31} width={31}/>
                {/* <img src={publicIcon} alt="" height={35} width={35}/> */}
                <img src={clock_pause} alt="" height={31} width={31}/>
              </div>
            )}
            <div className={`${props.SelectComment === "activeComments" ? "mt-5" : "mt-3"} row gap-1 g-0 text-center`}>
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
          <div
            className="p-1 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              fontSize: "14px",
            }}
          >
            2012 yılından beri profesyonel olarak maçları takip ediyorum.
            Premier lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için
            teşekkürler. 2012 yılından beri profesyonel olarak maçları takip
            ediyorum. Premier lig konusunda uzmanım. Yorumlarımı takip ettiğiniz
            için teşekkürler.
          </div>
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
              <span style={{paddingRight: props.SelectComment === "activeComments" ? "83px" : "83px"}}>07.05.2023</span>
              <span>
              </span>
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
                  border: "1px solid #FFCC00"
                }}
              >
                {props.SelectComment === "resolvedComments" && "1 - 1"}
              </div>
              <span>Başakşehir</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
              <span className="ps-1" style={{color: "#FF3030", fontSize:"12px"}}>The match has been stopped</span>
              <span
                className="p-1"
                style={{
                  backgroundColor:
                    props.SelectComment === "resolvedComments"
                      ? "#FFCC00"
                      : "#00659D",
                  color: props.SelectComment === "resolvedComments" ? "#0D2A53" : "#FFFFFF",
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
                  height={25}
                  width={25}
                />{" "}
                258
              </div>
              <div>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </div>
            </div>
            <div className="ms-auto" style={{ fontSize: "12px" }}>
              10 dk önce
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
          {props.SelectComment === "resolvedComments" && (
              <div className="d-flex justify-content-end pe-2">
                <img src={circle_x} alt="" height={31} width={31}/>
                {/* <img src={publicIcon} alt="" height={35} width={35}/> */}
              </div>
            )}
            <div className={`${props.SelectComment === "activeComments" ? "mt-5" : "mt-3"} row gap-1 g-0 text-center`}>
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
          <div
            className="p-1 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              fontSize: "14px",
            }}
          >
            2012 yılından beri profesyonel olarak maçları takip ediyorum.
            Premier lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için
            teşekkürler. 2012 yılından beri profesyonel olarak maçları takip
            ediyorum. Premier lig konusunda uzmanım. Yorumlarımı takip ettiğiniz
            için teşekkürler.
          </div>
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
              <span style={{paddingRight: props.SelectComment === "activeComments" ? "83px" : "83px"}}>07.05.2023</span>
              <span>
              </span>
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
                  border: "1px solid #FF5757"
                }}
              >
                {props.SelectComment === "resolvedComments" && "1 - 1"}
              </div>
              <span>Başakşehir</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span
                className="p-2"
                style={{
                  backgroundColor: "#FF5757",
                  color: props.SelectComment === "resolvedComments" ? "#0D2A53" : "#FFFFFF",
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
                  height={20}
                  width={20}
                />{" "}
                258
              </div>
              <div>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </div>
            </div>
            <div className="ms-auto" style={{ fontSize: "12px" }}>
              10 dk önce
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {props.SelectComment === "activeComments" && (
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
            <div className="row gap-1 g-0 text-center mt-5">
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
              <span className="pe-5">07.05.2023</span>
              <span>
              </span>
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
                    props.SelectComment === "activeComments"
                      ? currentTheme === "dark"
                        ? "1px solid #FFFFFF"
                        : "1px solid #0D2A53"
                      : "1px solid #00DE51",
                }}
              >
                {props.SelectComment === "resolvedComments" && "3 - 1"}
                {props.SelectComment === "activeComments" && "14:30"}
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
                      color: props.SelectComment === "resolvedComments" ? "#0D2A53" : "#FFFFFF",
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
                  height={20}
                  width={20}
                />{" "}
                258
              </div>
              <div>
                <img src={clapIcon} alt="" height={20} width={20} /> 258
              </div>
            </div>
            <div className="ms-auto" style={{ fontSize: "12px" }}>
              10 dk önce
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default CommentsContentSection;
