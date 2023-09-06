import React, { useState, useContext, useEffect } from "react";
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
import SubscribeModal from "../SubscribeModal/SubscribeModal";

import Selected_Clap from "../../assets/Selected Clap.svg";
import Light_Unselected_Clap from "../../assets/Light - Unselected Clap.svg";
import Dark_Unselected_Clap from "../../assets/Dark - Unselected Clap.svg";

import Selected_Like from "../../assets/Selected Like.svg";
import Dark_Unselected_Like from "../../assets/Dark - Unselected Like.svg";
import Light_Unselected_Like from "../../assets/Light - Unselected Like.svg";

import Selected_Favorite from "../../assets/Selected Favorite.svg";
import Dark_Unselected_Favorite from "../../assets/Dark - Unselected Favorite.svg";
import Light_Unselected_Favorite from "../../assets/Light - Unselected Favorite.svg";
import Swal from "sweetalert2";
import clapIcon1 from "../../assets/clap-svgrepo-com.png";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { GoStar, GoStarFill } from "react-icons/go";

const FavComments = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const favCommentData = props?.favCommentData;
  // console.log(favCommentData);

  const [followLabel, setFollowLabel] = useState("Follow");

  const followCommentator = async (commentator_id,isFollowing) => {
    try {
      // console.log("isFollowing",isFollowing)
      if(isFollowing){
        const confirmation = await Swal.fire({
          title: "Unfollow?",
          text: "Are you sure you want to unfollow this commentator?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        });
        // console.log(confirmation.value);
        if (confirmation.value === true) {
          const res = await axios.get(
            `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
          );
          // console.log("On Unfollow",res)
          setFollowLabel(() =>
            followLabel === "Follow" ? "Followed" : "Follow"
          );

          Swal.fire({
            title: "You have Unfollowed",
            icon: "success",
          });
          const user_id = localStorage.getItem("user-id");
        props.homeApiData(user_id);
        }
      }else{
        const res = await axios.get(
          `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
        );
        // console.log("On Follow",res)
        const user_id = localStorage.getItem("user-id");
        props.homeApiData(user_id);
      }

    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

  const handleCommentReaction = async (id, reaction, count) => {

  localStorage.setItem(`${id}_${reaction}`, count);
    const res = await axios.post(
      `${config?.apiUrl}/comment-reaction/${id}/${userId}`,
      {
        reaction_type: `${reaction}`,
      }
    );
      // const user_id = localStorage.getItem("user-id");
      props.homeApiData(userId);
      props.getFavData()
  };

  const [modalShow, setModalShow] = React.useState(false);

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
              <div
                className="position-relative col p-0"
                onClick={() => {
                  props?.setActiveCommentsshow(res?.commentator_user?.id);
                  props?.setDashboardSUser(false);
                  props?.setSelectContent("show-all-comments");
                }}
              >
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
                    style={{ objectFit: "cover", borderRadius: "50%" }}
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
                  {props.verifyid?.includes(res?.commentator_user?.id) && (
                    <img src={blueTick} alt="" width={16} height={16} />
                  )}
                </div>
              </div>
              <div className="col p-0">
                <div className="d-flex justify-content-end pe-2 mt-3">
                  <button
                      onClick={() => {
                        followCommentator(res?.commentator_user?.id,props.followingid.includes(res?.commentator_user?.id));
                      }}
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
                    {props?.followingid?.includes(res?.commentator_user?.id)
                        ? "Followed"
                        : "Follow"}
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
                  <div
                  onClick={() => {
                      handleCommentReaction(
                        res?.id,
                        "like",
                        res?.total_reactions.total_likes
                      );
                    }}
                     className="d-flex align-items-center gap-2">
                    {/* <img
                      src={
                        currentTheme === "dark"
                          ? Dark_Unselected_Like
                          : Light_Unselected_Like
                      }
                      alt=""
                      height={20}
                      width={20}
                    />{" "} */}
                    <div>
                      {props.cmtReact?.map((e)=>e.comment_id)?.includes(res?.id) ? (
                        props.cmtReact.filter((e)=>e.comment_id==res?.id)[0].like == 1 ? (
                          <PiHeartStraightFill size={25} color="#ff3030" />
                        ) : (
                          <PiHeartStraight size={25} color="#ff3030" />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <PiHeartStraight size={25} color="#ff3030" />
                      )}{" "}
                    {res?.total_reactions?.total_likes}
                    </div>
                  </div>
                  <div 
                      onClick={() => {
                      handleCommentReaction(
                        res?.id,
                        "favorite",
                        res?.total_reactions?.total_favorite
                      );
                    }}>
                    {/* <img
                      src={`${
                        currentTheme === "dark" ? starDarkLogin : starIcon
                      }`}
                      alt=""
                      height={23}
                      width={23}
                    /> */}
                    <div>
                    {props.cmtReact?.map((e)=>e.comment_id)?.includes(res?.id) ? (
                      props.cmtReact.filter((e)=>e.comment_id==res?.id)[0].favorite == 1 ? (
                          <GoStarFill size={25} color="#ffcc00" />
                        ) : (
                          <GoStar size={25} color="#ffcc00" />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <GoStar size={25} color="#ffcc00" />
                      )}{" "}
                    {res?.total_reactions?.total_favorite}
                    </div>
                  </div>
                  <div
                  onClick={() => {
                      handleCommentReaction(
                        res?.id,
                        "clap",
                        res?.total_reactions?.total_clap
                      );
                    }}
                    >
                    {/* <img
                      src={currentTheme === "dark" ? clapIcon : clapLight}
                      alt=""
                      height={20}
                      width={20}
                    />{" "} */}
                    {props.cmtReact?.map((e)=>e.comment_id)?.includes(res?.id) ? (
                      props.cmtReact.filter((e)=>e.comment_id==res?.id)[0].clap == 1 ? (
                          <img
                      src={clapIcon1}
                      alt=""
                      height={20}
                      width={20}
                    />
                        ) : (
                          <img
                      src={clapIcon}
                      alt=""
                      height={20}
                      width={20}
                    />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <img
                      src={clapIcon}
                      alt=""
                      height={20}
                      width={20}
                    />
                      )}{" "}
                    {res?.total_reactions?.total_clap}
                  </div>
                </div>
                <div className="ms-auto" style={{ fontSize: "12px" }}>
                  <button
                    onClick={() => setModalShow(true)}
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
      <SubscribeModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default FavComments;
