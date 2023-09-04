import React, { useContext, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star-1.svg";
import likeIcondark from "../../assets/LikeDark.png";
import clapIcon from "../../assets/Path 4530.png";
import clapLight from "../../assets/Path 4537.png";
import TurkeyFalg from "../../assets/flagTurk.png";
import lock from "../../assets/lock.svg";
import darklock from "../../assets/darklock.svg";
import starDarkLogin from "../../assets/star-1.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import world_check_light from "../../assets/world-check.png";
import world_check from "../../assets/world-check.svg";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";

const FavComments = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const favCommentData = props?.favCommentData;
  // console.log(favCommentData);

  // Follow commentator
  // const followCommentator = () =>{
  //   try {
  //  const res = await axios.get(`http://127.0.0.1:8000/follow-commentator/${userId}/?id=${}`)
  //    console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      {/* <ContentSection userComments={userComments}/> */}
      <>
        {favCommentData?.map((res, index) => (
          <div
            key={index}
            className={`card border-0 rounded-0 mb-2 ${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            }`}
          >
            <div className="row m-2">
              <div className="position-relative col p-0">
                <img
                  src={crown}
                  alt=""
                  height={21}
                  width={21}
                  style={{
                    background: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                    borderRadius: "50%",
                    left: "3.3rem",
                    position: "absolute",
                  }}
                />
                <div className="col">
                  <img 
                  style={{objectFit: "cover", borderRadius: "50%"}}
                    src={
                      res?.commentator_user?.profile_pic
                        ? `${config.apiUrl}${res?.commentator_user?.profile_pic}`
                        : profile
                    }
                    width={75}
                    height={75}
                    alt=""
                  />
                  <span className="p-1 autorname-responsive">
                    {res?.commentator_user?.username}
                  </span>
                  <img src={blueTick} alt="" width={16} height={16} />
                </div>
              </div>
              <div className="col p-0">
                <div className="d-flex justify-content-end pe-2 mt-3">
                  <button
                    style={{
                      border:
                        currentTheme === "dark"
                          ? "1px solid #4DD5FF"
                          : "1px solid #007BF6",
                      color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                      backgroundColor: "transparent",
                      borderRadius: "18px",
                      padding: "0.1rem 2.1rem",
                      fontSize: "13px",
                    }}
                  >
                    Follow
                  </button>
                </div>

                <div className="mt-3 row gap-1 g-0 text-center">
                  <div className="col">
                    <div className="rate-fonts">Success Rate</div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                    >
                      %{res?.commentator_user?.success_rate}
                    </div>
                  </div>
                  <div className="col">
                    <div className="rate-fonts">Score Points</div>
                    <div style={{ fontSize: "1rem", color: "#FFA200" }}>
                    {res?.commentator_user?.score_points}
                    </div>
                  </div>
                </div>
              </div>

              {res.public_content === true ? (
                <>
                  <div
                    className="p-1 my-2 content-font"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    {/* 2012 yılından beri profesyonel olarak maçları takip ediyorum.
                Premier lig konusunda uzmanım.Yorumlarımı takip ettiğiniz için
                teşekkürler. 2012 yılından beri profesyonel olarak maçları takip
                ediyorum. Premier lig konusunda uzmanım. Yorumlarımı takip
                ettiğiniz için teşekkürler. */}
                    {res.comment}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="px-2 py-3 my-2 d-flex justify-content-center"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <img
                      src={`${currentTheme === "dark" ? lock : darklock}`}
                      alt=""
                      height={32}
                      width={32}
                    />
                  </div>
                </>
              )}

              <div
                className="p-1"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  fontSize: "13px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center gap-1">
                  <span>
                    <img
                      className=""
                      src={TurkeyFalg}
                      alt=""
                      height={26}
                      width={26}
                    />
                    <span className="ps-1">{res?.country}</span>
                    {/* <span className="ps-1">Süper Lig</span> */}
                  </span>
                  <span style={{ paddingRight: "53px" }}>{res.date}</span>
                  <span>
                    {res.public_content === true ? (
                      <img
                        src={`${
                          currentTheme === "dark"
                            ? world_check
                            : world_check_light
                        }`}
                        alt=""
                        height={31}
                        width={31}
                      />
                    ) : null}{" "}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <span className="mt-2 pt-1">
                    {res?.match_detail.split(" - ")[0]}
                  </span>
                  <div
                    className="px-2"
                    style={{
                      width: "66px",
                      height: "38px",
                    }}
                  >
                    <CircularProgressbar
                      circleRatio={0.75}
                      strokeWidth={3}
                      value={100}
                      text="14:30"
                      styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        textColor:
                          currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                        textSize: "26px",
                        pathColor:
                          currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                      })}
                    />
                  </div>
                  <span className="mt-2 pt-1">
                    {res?.match_detail.split(" - ")[1]}
                  </span>
                </div>
                <div className="text-end mt-3 mb-2">
                  <span
                    className="p-1 px-2"
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
                    {res.public_content
                      ? "FT - Home & 2.5 Over 2.40"
                      : "Subscribers Only"}
                  </span>
                </div>
              </div>

              <div className="d-flex mt-2 align-items-center">
                <div
                  className="gap-2 d-flex align-items-center"
                  style={{ fontSize: "13px" }}
                >
                  <div>
                    <img
                      src={`${
                        currentTheme === "dark" ? likeIcondark : likeIcon
                      }`}
                      alt=""
                      height={20}
                      width={20}
                    />{" "}
                    {res?.total_reactions?.total_likes}
                  </div>
                  <div>
                    <img
                      src={`${
                        currentTheme === "dark" ? starDarkLogin : starIcon
                      }`}
                      alt=""
                      height={23}
                      width={23}
                    />
                    {res?.total_reactions?.total_favorite}
                  </div>
                  <div>
                    <img
                      src={currentTheme === "dark" ? clapIcon : clapLight}
                      alt=""
                      height={20}
                      width={20}
                    />{" "}
                    {res?.total_reactions?.total_clap}
                  </div>
                </div>
                <div className="ms-auto" style={{ fontSize: "12px" }}>
                  <button
                    className="me-2 px-2 py-1"
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

                  <span style={{ fontSize: "11px" }}>10 dk önce</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    </>
  );
};

export default FavComments;
