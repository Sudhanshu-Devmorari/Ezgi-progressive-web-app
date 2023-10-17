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
import { truncateString, userId } from "../GetUser";
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
import { formatTimeDifference } from "../FormatTime";
import circle_check from "../../assets/circle-check.png";
import clock_pause from "../../assets/clock-pause.svg";
import circle_x from "../../assets/circle-x.png";

const FavComments = (props) => {
  const {
    data,
    setSelectContent,
    selectContent,
    userComments,
    SelectComment,
    setActiveCommentsshow,
    followingList,
    followingid,
    verifyid,
    cmtReact,
    homeApiData,
    setArrayMerge,
    publicComments,
    setPublicComments,
    mergeArrays,
    setCmtReact,
    favSelection,
    favCommentData,
    setFavCommentData,
    getFavData,
  } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [followLabel, setFollowLabel] = useState("Follow");

  const errorSwal = () => {
    // console.log(localStorage.getItem("user-active"))

    Swal.fire({
      title: "Error",
      text: `Your account has been deactivated. Contact support for assistance.`,
      icon: "error",
      backdrop: false,
      customClass:
        currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    });
  };

  const followCommentator = async (commentator_id, isFollowing) => {
    try {
      if (isFollowing) {
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
        if (confirmation.value === true) {
          const res = await axios.get(
            `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
          );
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
      } else {
        const res = await axios.get(
          `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
        );
        const user_id = localStorage.getItem("user-id");
        props.homeApiData(user_id);
      }
    } catch (error) {
      console.log("Error fetching data.", error);
      if (error?.response?.status === 400) {
        // Swal.fire({
        //   title: "Error",
        //   text: `${error.response.data}`,
        //   icon: "error",
        //   backdrop: false,
        //   customClass:
        //     currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        // });
      }
    }
  };

  const handleCommentReaction = async (id, reaction, count) => {
    localStorage.setItem(`${id}_${reaction}`, count);
    try {
      const res = await axios.post(
        `${config?.apiUrl}/comment-reaction/${id}/${userId}`,
        {
          reaction_type: `${reaction}`,
        }
      );

      if (res.status == 200) {
        let data = res?.data?.data;
        if (data) {
          favCommentData.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_clap = data?.total_clap;
          favCommentData.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_favorite = data?.total_favorite;
          favCommentData.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_likes = data?.total_likes;

          const filterData = favCommentData.filter(
            (response) =>
              response.total_reactions.total_favorite !== data?.total_favorite
          );

          setFavCommentData(
            reaction == "favorite" ? filterData : favCommentData
          );

          publicComments.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_clap = data?.total_clap;
          publicComments.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_favorite = data?.total_favorite;
          publicComments.filter(
            (response) => response.id == data?.comment_id
          )[0].total_reactions.total_likes = data?.total_likes;

          setPublicComments(publicComments);

          const commentIds = cmtReact.map((data) => {
            return data.comment_id;
          });

          if (commentIds.includes(data?.comment_id)) {
            cmtReact.filter(
              (response) => response.comment_id == data?.comment_id
            )[0].clap = data?.clap;
            cmtReact.filter(
              (response) => response.comment_id == data?.comment_id
            )[0].favorite = data?.favorite;
            cmtReact.filter(
              (response) => response.comment_id == data?.comment_id
            )[0].like = data?.like;
          } else {
            const newObj = {
              clap: data?.clap,
              comment_id: data?.comment_id,
              favorite: data?.favorite,
              like: data?.like,
            };
            cmtReact.push(newObj);
          }

          setCmtReact(cmtReact);
          mergeArrays();
        }
      }
      if (res.status == 204) {
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [commentatorUser, setcommentatorUser] = useState([]);

  // check activation
  const checkDeactivation = async (value, is_subscribe) => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/check-deactivated-account/${userId}`
      );
      if (res.status === 200) {
        if (!is_subscribe) {
          setcommentatorUser(value);
          setModalShow(true);
        }
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  return (
    <>
      {favCommentData.length == 0 ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          No Record Found!
        </div>
      ) : (
        favCommentData?.map((res, index) => {
          const truncated = truncateString(res?.country, 6);
          return (
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
                    const currentPage = localStorage.getItem("currentpage");
                    const currentuser = localStorage.getItem("user-role");
                    localStorage.setItem("dashboardShow", true);
                    (currentPage !== "show-all-comments" ||
                      currentPage !== "notifications") &&
                      localStorage.setItem("priviouspage", currentPage);
                    localStorage.setItem("currentpage", "show-all-comments");
                    localStorage.setItem(
                      "subcurrentpage",
                      currentuser == "standard" ? "subscribers" : "home"
                    );
                    localStorage.setItem(
                      "activeCommentId",
                      res?.commentator_user?.id
                    );
                    props?.setActiveCommentsshow(res?.commentator_user?.id);
                    props?.setDashboardSUser(false);
                    props?.setSelectContent("show-all-comments");
                  }}
                >
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    src={crown}
                    alt=""
                    height={21}
                    width={21}
                    style={{
                      background:
                        currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                      borderRadius: "50%",
                      left: "3.3rem",
                      position: "absolute",
                    }}
                  />
                  <div className="col">
                    <img
                      onContextMenu={(e) => e.preventDefault()}
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
                      {truncateString(res?.commentator_user?.username, 7)}
                    </span>
                    {props.verifyid?.includes(res?.commentator_user?.id) && (
                      <img
                        onContextMenu={(e) => e.preventDefault()}
                        src={blueTick}
                        alt=""
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                </div>
                <div className="col p-0">
                  <div className="d-flex justify-content-end pe-2 mt-3">
                    {userId != res?.commentator_user?.id && (
                      <button
                        onClick={() => {
                          followCommentator(
                            res?.commentator_user?.id,
                            props?.followingid?.includes(
                              res?.commentator_user?.id
                            )
                          );
                        }}
                        style={{
                          border:
                            currentTheme === "dark"
                              ? "1px solid #4DD5FF"
                              : "1px solid #007BF6",
                          color:
                            currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
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
                    )}
                  </div>

                  <div className="mt-3 row gap-1 g-0 text-center">
                    <div className="col">
                      <div className="rate-fonts">Success Rate</div>
                      <div
                        style={{
                          fontSize: "1rem",
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
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

                {res.public_content === false && res.is_subscribe ? (
                  <div
                    className="p-1 my-2 content-font"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    {res.comment}
                  </div>
                ) : (
                  <>
                    {res?.public_content === true || res?.is_resolve ? (
                      <>
                        <div
                          className="p-1 my-2 content-font"
                          style={{
                            backgroundColor:
                              currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          }}
                        >
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
                            onContextMenu={(e) => e.preventDefault()}
                            src={`${currentTheme === "dark" ? lock : darklock}`}
                            alt=""
                            height={32}
                            width={32}
                          />
                        </div>
                      </>
                    )}
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
                        onContextMenu={(e) => e.preventDefault()}
                        className=""
                        src={TurkeyFalg}
                        alt=""
                        height={26}
                        width={26}
                      />
                      <span className="ps-1">{truncated}</span>
                    </span>
                    <span style={{ paddingRight: "53px" }}>{res.date}</span>
                    <span>
                      {res.public_content === true ? (
                        <img
                          onContextMenu={(e) => e.preventDefault()}
                          src={`${
                            currentTheme === "dark"
                              ? world_check
                              : world_check_light
                          }`}
                          alt=""
                          height={31}
                          width={31}
                        />
                      ) : null}
                      {res?.is_resolve && (
                        <>
                          {res?.is_prediction == true && (
                            <img
                              src={circle_check}
                              alt=""
                              height={31}
                              width={31}
                            />
                          )}

                          {(res?.is_prediction != true ||
                            res?.status === "yellow") && (
                            <img
                              src={
                                (res?.is_prediction != true && circle_x) ||
                                (res?.status === "yellow" && clock_pause)
                              }
                              alt=""
                              height={31}
                              width={31}
                            />
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span
                      className="mt-2 pt-1 text-end"
                      style={{ width: "140px" }}
                    >
                      <span className="w-100">
                        {res?.match_detail?.split(" - ")[0]}
                      </span>
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
                        text={
                          res?.is_resolve ? res?.match_score : res?.match_time || "00:00"
                        }
                        styles={buildStyles({
                          rotation: 1 / 2 + 1 / 8,
                          textColor:
                            currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                          textSize: "26px",
                          // pathColor:
                          //   currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                          pathColor: res?.is_resolve
                            ? currentTheme === "dark"
                              ? res.is_prediction == true
                                ? "#37FF80"
                                // : res.status === "yellow"
                                // ? "#FFCC00"
                                : res.is_prediction == false
                                ? "#FF5757"
                                : "#00659D"
                              : res.is_prediction == true
                              ? "#37FF80"
                              // : res.status === "yellow"
                              // ? res.color
                              : res.is_prediction == false
                              ? "#FF5757"
                              : "#00659D"
                            : currentTheme === "dark"
                            ? "#E6E6E6"
                            : "#0D2A53",
                        })}
                      />
                    </div>
                    <span className="mt-2 pt-1" style={{ width: "156px" }}>
                      <span className="w-100">
                        {res?.match_detail.split(" - ")[1]}
                      </span>
                    </span>
                  </div>
                  <div className="text-end mt-3 mb-2">
                    <span
                      className="p-1 px-2"
                      style={{
                        backgroundColor: res?.is_resolve
                          ? currentTheme === "dark"
                            ? res?.is_prediction == true
                              ? "#37FF80"
                              // : res?.status === "yellow"
                              // ? "#FFCC00"
                              : res?.is_prediction == false
                              ? "#FF5757"
                              : "#00659D"
                            : res?.is_prediction == true
                            ? "#37FF80"
                            // : res?.status === "yellow"
                            // ? res?.color
                            : res?.is_prediction == false
                            ? "#FF5757"
                            : "#00659D"
                          : props.SelectComment === "resolvedComments"
                          ? "#00DE51"
                          : "#00659D",
                        color:
                          props.SelectComment === "resolvedComments"
                            ? "#0D2A53"
                            : "#FFFFFF",
                        fontSize: "12px",
                      }}
                    >
                      {res.public_content || res.is_subscribe || res?.is_resolve
                        ? `${res?.prediction_type} & ${res?.prediction}`
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
                      className="d-flex align-items-center gap-2"
                    >
                      <div>
                        {props.cmtReact
                          ?.map((e) => e.comment_id)
                          ?.includes(res?.id) ? (
                          props.cmtReact.filter(
                            (e) => e.comment_id == res?.id
                          )[0].like == 1 ? (
                            <img
                              onContextMenu={(e) => e.preventDefault()}
                              src={Selected_Like}
                              alt=""
                              height={20}
                              width={20}
                            />
                          ) : (
                            <img
                              onContextMenu={(e) => e.preventDefault()}
                              src={
                                currentTheme === "dark"
                                  ? Dark_Unselected_Like
                                  : Light_Unselected_Like
                              }
                              alt=""
                              height={20}
                              width={20}
                            />
                          )
                        ) : (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={
                              currentTheme === "dark"
                                ? Dark_Unselected_Like
                                : Light_Unselected_Like
                            }
                            alt=""
                            height={20}
                            width={20}
                          />
                        )}{" "}
                        {res?.total_reactions?.total_likes}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (userId != res?.commentator_user?.id) {
                          handleCommentReaction(
                            res?.id,
                            "favorite",
                            res?.total_reactions?.total_favorite
                          );
                        }
                      }}
                    >
                      <div>
                        {props.cmtReact
                          ?.map((e) => e.comment_id)
                          ?.includes(res?.id) ? (
                          props.cmtReact.filter(
                            (e) => e.comment_id == res?.id
                          )[0].favorite == 1 ? (
                            <img
                              onContextMenu={(e) => e.preventDefault()}
                              src={Selected_Favorite}
                              alt=""
                              height={20}
                              width={20}
                            />
                          ) : (
                            <img
                              onContextMenu={(e) => e.preventDefault()}
                              src={
                                currentTheme === "dark"
                                  ? Dark_Unselected_Favorite
                                  : Light_Unselected_Favorite
                              }
                              alt=""
                              height={20}
                              width={20}
                            />
                          )
                        ) : (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={
                              currentTheme === "dark"
                                ? Dark_Unselected_Favorite
                                : Light_Unselected_Favorite
                            }
                            alt=""
                            height={20}
                            width={20}
                          />
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
                      {props.cmtReact
                        ?.map((e) => e.comment_id)
                        ?.includes(res?.id) ? (
                        props.cmtReact.filter((e) => e.comment_id == res?.id)[0]
                          .clap == 1 ? (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={Selected_Clap}
                            alt=""
                            height={20}
                            width={20}
                          />
                        ) : (
                          <img
                            onContextMenu={(e) => e.preventDefault()}
                            src={
                              currentTheme === "dark"
                                ? Dark_Unselected_Clap
                                : Light_Unselected_Clap
                            }
                            alt=""
                            height={20}
                            width={20}
                          />
                        )
                      ) : (
                        <img
                          onContextMenu={(e) => e.preventDefault()}
                          src={
                            currentTheme === "dark"
                              ? Dark_Unselected_Clap
                              : Light_Unselected_Clap
                          }
                          alt=""
                          height={20}
                          width={20}
                        />
                      )}{" "}
                      {res?.total_reactions?.total_clap}
                    </div>
                  </div>
                  <div className="ms-auto" style={{ fontSize: "12px" }}>
                    {res?.commentator_user?.commentator_level !==
                      "apprentice" && (
                      <>
                        {userId != res?.commentator_user?.id && (
                          <button
                            onClick={() => {
                              checkDeactivation(
                                res?.commentator_user,
                                res?.is_subscribe
                              );
                            }}
                            className="me-2 px-2 py-1"
                            style={{
                              border:
                                currentTheme === "dark"
                                  ? "1px solid #37FF80"
                                  : "1px solid #00659D",
                              color:
                                currentTheme === "dark" ? "#37FF80" : "#00659D",
                              backgroundColor: "transparent",
                              borderRadius: "3px",
                            }}
                          >
                            {res?.is_subscribe ? "Subscribed" : "Subscribe"}
                          </button>
                        )}
                      </>
                    )}
                    <span style={{ fontSize: "11px" }}>
                      {formatTimeDifference(res?.created)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <SubscribeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        commentatorUser={commentatorUser}
      />
    </>
  );
};

export default FavComments;
