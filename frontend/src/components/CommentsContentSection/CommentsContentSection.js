import React, { useContext, useState, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star-1.svg";
import likeIcondark from "../../assets/LikeDark.png";
import starIcondark from "../../assets/star.svg";
import clapIcon from "../../assets/clap.png";
import clapIcon1 from "../../assets/clap-svgrepo-com.png";
import publicIcon from "../../assets/publicIcon.svg";
import publicDark from "../../assets/world-check.svg";
import TurkeyFalg from "../../assets/flagTurk.png";
import lock from "../../assets/lock.svg";
import darklock from "../../assets/darklock.svg";
import circle_check from "../../assets/circle-check.png";
import clock_pause from "../../assets/clock-pause.svg";
import circle_x from "../../assets/circle-x.png";
import { Link } from "react-router-dom";
import "./CommentsContentSection.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import world_check from "../../assets/world-check.svg";
import world_check_light from "../../assets/world-check.png";
import clapLight from "../../assets/Path 4537.png";
import axios from "axios";
import starDarkLogin from "../../assets/star-1.png";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { GoStar, GoStarFill } from "react-icons/go";
import config from "../../config";

import Selected_Clap from "../../assets/Selected Clap.svg";
import Light_Unselected_Clap from "../../assets/Light - Unselected Clap.svg";
import Dark_Unselected_Clap from "../../assets/Dark - Unselected Clap.svg";

import Selected_Like from "../../assets/Selected Like.svg";
import Dark_Unselected_Like from "../../assets/Dark - Unselected Like.svg";
import Light_Unselected_Like from "../../assets/Light - Unselected Like.svg";

import Selected_Favorite from "../../assets/Selected Favorite.svg";
import Dark_Unselected_Favorite from "../../assets/Dark - Unselected Favorite.svg";
import Light_Unselected_Favorite from "../../assets/Light - Unselected Favorite.svg";

const CommentsContentSection = (props) => {
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
  } = props;
  const [active, setActive] = useState([]);
  const [resolve, setResolve] = useState([]);
  const server_url = `${config?.apiUrl}`;

  const activeResolved = async (user_id) => {
    const res = await axios
      .get(`${config?.apiUrl}/active-resolved-comment/${user_id}`)
      .then((res) => {
        // console.log("activeResolved: ", res);
        setActive(res.data?.active_comments);
        setResolve(res.data?.resolved_comments);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      }, []);
  };
  const handleCommentReaction = async (id, reaction) => {
    const user_id = localStorage.getItem("user-id");
    const res = await axios.post(
      `${config?.apiUrl}/comment-reaction/${id}/${user_id}`,
      {
        reaction_type: `${reaction}`,
      }
    );
    // console.log(res);
    // console.log(id, "!!!!!!!!!!!!!!!", reaction);
    // props.homeApiData(user_id);
    if (res.status == 200) {
      let data = res?.data?.data;
      if (data) {
        publicComments.filter(
          (response) => response.id == data?.comment_id
        )[0].total_reactions.total_clap = data?.total_clap;
        publicComments.filter(
          (response) => response.id == data?.comment_id
        )[0].total_reactions.total_favorite = data?.total_favorite;
        publicComments.filter(
          (response) => response.id == data?.comment_id
        )[0].total_reactions.total_likes = data?.total_likes;

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

        setPublicComments(publicComments);
        setCmtReact(cmtReact);
        mergeArrays();
      }
    }
    activeResolved(user_id);
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    activeResolved(user_id);
  }, []);
  // console.log("^^^^^^^^", active);
  // console.log("^^^^^^^^", resolve);
  // console.log("SelectComment^^^^^^^^", props.SelectComment);

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const subscribersContent = [{ name: "melihaksar" }];
  const publicContent = [{ name: "melihaksar" }];
  const resolvedComments = [
    { name: "melihaksar", time: "3 - 1", color: "#00DE51", status: "green" },
    {
      name: "melihaksar",
      time: "1 - 1",
      text: "The match has been stoped",
      color: "#FF5757",
      status: "red",
    },
    { name: "melihaksar", time: "1 - 1", color: "#FFCC00", status: "yellow" },
  ];
  return (
    <>
      {props.SelectComment === "activeComments" && (
        <>
          {active.map((val) => {
            return (
              <>
                {val.public_content == true ? (
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
                              background:
                                currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                              borderRadius: "50%",
                              left: "3.3rem",
                              position: "absolute",
                            }}
                          />
                          <div className="col">
                            <img src={profile} width={75} height={75} alt="" />
                            <span className="p-1 autorname-responsive">
                              {val?.commentator_user?.username}
                            </span>
                            {props.verifyid?.includes(
                              val?.commentator_user?.id
                            ) && (
                              <img
                                src={blueTick}
                                alt=""
                                width={14}
                                height={14}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col p-0">
                          <div className="d-flex justify-content-end pe-2">
                            <img
                              src={`${
                                currentTheme === "dark"
                                  ? world_check
                                  : publicIcon
                              }`}
                              alt=""
                              height={35}
                              width={35}
                            />
                          </div>

                          <div className=" row gap-1 g-0 text-center">
                            <div className="col">
                              <div className="rate-fonts">Success Rate</div>
                              <div
                                style={{
                                  fontSize: "1rem",
                                  color:
                                    currentTheme === "dark"
                                      ? "#D2DB08"
                                      : "#00659D",
                                }}
                              >
                                %{val?.commentator_user?.success_rate}
                              </div>
                            </div>
                            <div className="col">
                              <div className="rate-fonts">Score Points</div>
                              <div
                                style={{ fontSize: "1rem", color: "#FFA200" }}
                              >
                                {val?.commentator_user?.score_points}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="p-1 my-2 content-font"
                          style={{
                            backgroundColor:
                              currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          }}
                        >
                          {val?.comment}
                        </div>

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
                              <span className="ps-1">{val?.league}</span>
                            </span>
                            <span style={{ paddingRight: "80px" }}>
                              {val?.date}
                            </span>
                            <span></span>
                          </div>
                          <div className="d-flex justify-content-center">
                            <span className="mt-2 pt-1">
                              {val?.match_detail.split(" - ")[0]}
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
                                    currentTheme === "dark"
                                      ? "#E6E6E6"
                                      : "#0D2A53",
                                  textSize: "26px",
                                  pathColor:
                                    currentTheme === "dark"
                                      ? "#E6E6E6"
                                      : "#0D2A53",
                                })}
                              />
                            </div>
                            <span className="mt-2 pt-1">
                              {val?.match_detail.split(" - ")[1]}
                            </span>
                          </div>
                          <div className="text-end mt-3 mb-2">
                            <span
                              className={`p-1 px-2`}
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
                          <div
                            className="gap-2 d-flex align-items-center"
                            style={{ fontSize: "13px" }}
                          >
                            <div
                              onClick={() => {
                                handleCommentReaction(val?.id, "like");
                              }}
                            >
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].like == 1 ? (
                                  <img
                                    src={Selected_Like}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                ) : (
                                  <img
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
                              {val?.total_reactions?.total_likes}
                            </div>
                            <div
                              onClick={() => {
                                handleCommentReaction(val?.id, "favorite");
                              }}
                            >
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].favorite == 1 ? (
                                  <img
                                    src={Selected_Favorite}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                ) : (
                                  <img
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
                              {val?.total_reactions?.total_favorite}
                            </div>
                            <div
                              onClick={() => {
                                handleCommentReaction(val?.id, "clap");
                              }}
                            >
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].clap == 1 ? (
                                  <img
                                    src={Selected_Clap}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                ) : (
                                  <img
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
                                // <img src={likeIcondark} alt="" height={20} width={20} />
                                <img
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
                              {val?.total_reactions?.total_clap}
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
                                  color:
                                    currentTheme === "dark"
                                      ? "#37FF80"
                                      : "#00659D",
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
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
                ) : (
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
                              background:
                                currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                              borderRadius: "50%",
                              left: "3.3rem",
                              position: "absolute",
                            }}
                          />
                          <div className="col">
                            <img
                              src={`${
                                server_url + val?.commentator_user?.profile_pic
                              }`}
                              className="rounded-circle"
                              width={75}
                              height={75}
                              alt=""
                            />
                            <span className="p-1 autorname-responsive">
                              {val?.commentator_user?.username}
                            </span>
                            <img src={blueTick} alt="" width={16} height={16} />
                          </div>
                        </div>
                        <div className="col p-0">
                          <div
                            className={`
                    mt-5 row gap-1 g-0 text-center`}
                          >
                            <div className="col">
                              <div className="rate-fonts">Success Rate</div>
                              <div
                                style={{
                                  fontSize: "1.2rem",
                                  color:
                                    currentTheme === "dark"
                                      ? "#D2DB08"
                                      : "#00659D",
                                }}
                              >
                                %{val?.commentator_user?.success_rate}
                              </div>
                            </div>
                            <div className="col">
                              <div className="rate-fonts">Score Points</div>
                              <div
                                style={{ fontSize: "1.2rem", color: "#FFA200" }}
                              >
                                {val?.commentator_user?.score_points}
                              </div>
                            </div>
                          </div>
                        </div>

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
                              <span className="ps-1">{val?.league}</span>
                            </span>
                            <span style={{ paddingRight: "80px" }}>
                              {val?.date}
                            </span>
                            <span></span>
                          </div>
                          <div className="d-flex justify-content-center">
                            <span className="mt-2 pt-1">
                              {val?.match_detail.split(" - ")[0]}
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
                                    currentTheme === "dark"
                                      ? "#E6E6E6"
                                      : "#0D2A53",
                                  textSize: "26px",
                                  pathColor:
                                    currentTheme === "dark"
                                      ? "#E6E6E6"
                                      : "#0D2A53",
                                })}
                              />
                            </div>
                            <span className="mt-2 pt-1">
                              {val?.match_detail.split(" - ")[1]}
                            </span>
                          </div>
                          <div className="text-end mt-3 mb-2 align-items-center">
                            <span
                              className={`p-1 px-2`}
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
                              Subscribers Only{" "}
                              <img
                                className="mb-1"
                                src={lock}
                                alt=""
                                height={15}
                                width={15}
                              />
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
                                handleCommentReaction(val?.id, "like");
                              }}
                            >
                              {/* <img
                                src={`${
                                  currentTheme === "dark"
                                    ? likeIcondark
                                    : likeIcon
                                }`}
                                alt=""
                                height={20}
                                width={20}
                              />{" "} */}
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].like == 1 ? (
                                  <PiHeartStraightFill
                                    size={25}
                                    color="#ff3030"
                                  />
                                ) : (
                                  <PiHeartStraight size={25} color="#ff3030" />
                                )
                              ) : (
                                // <img src={likeIcondark} alt="" height={20} width={20} />
                                <PiHeartStraight size={25} color="#ff3030" />
                              )}{" "}
                              {val?.total_reactions?.total_likes}
                            </div>
                            <div
                              onClick={() => {
                                handleCommentReaction(val?.id, "favorite");
                              }}
                            >
                              {/* <img
                                src={`${
                                  currentTheme === "dark"
                                    ? starIcondark
                                    : starIcon
                                }`}
                                alt=""
                                height={23}
                                width={23}
                              />{" "} */}
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].favorite == 1 ? (
                                  <GoStarFill size={25} color="#ffcc00" />
                                ) : (
                                  <GoStar size={25} color="#ffcc00" />
                                )
                              ) : (
                                // <img src={likeIcondark} alt="" height={20} width={20} />
                                <GoStar size={25} color="#ffcc00" />
                              )}{" "}
                              {val?.total_reactions?.total_favorite}
                            </div>
                            <div
                              onClick={() => {
                                handleCommentReaction(val?.id, "clap");
                              }}
                            >
                              {/* <img
                                src={
                                  currentTheme === "dark" ? clapIcon : clapLight
                                }
                                alt=""
                                height={20}
                                width={20}
                              />{" "} */}
                              {props.cmtReact
                                ?.map((e) => e.comment_id)
                                ?.includes(val?.id) ? (
                                props.cmtReact.filter(
                                  (e) => e.comment_id == val?.id
                                )[0].clap == 1 ? (
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
                              {val?.total_reactions?.total_clap}
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
                                  color:
                                    currentTheme === "dark"
                                      ? "#37FF80"
                                      : "#00659D",
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
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
                )}
              </>
            );
          })}
        </>
      )}

      {props.SelectComment === "resolvedComments" && (
        <>
          {/* {resolve.map((val) => {
            return <>{}</>;
          })} */}
          {resolve.map((res, index) => (
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
                      background:
                        currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                      borderRadius: "50%",
                      left: "3.3rem",
                      position: "absolute",
                    }}
                  />
                  <div className="col">
                    <img
                      src={`${server_url + res?.commentator_user?.profile_pic}`}
                      className="rounded-circle"
                      width={75}
                      height={75}
                      alt=""
                    />
                    <span className="p-1 autorname-responsive">
                      {res?.commentator_user?.username}
                    </span>
                    {props.verifyid?.includes(res?.commentator_user?.id) && (
                      <img src={blueTick} alt="" width={14} height={14} />
                    )}
                  </div>
                </div>
                <div className="col p-0">
                  {props.SelectComment === "resolvedComments" && (
                    <div className="d-flex justify-content-end pe-2">
                      {/* {res.status === "green" && ( */}
                      <>
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
                        {res?.public_content == true && (
                          <img
                            src={circle_check}
                            alt=""
                            height={31}
                            width={31}
                          />
                        )}
                      </>
                      {/* )} */}
                      {(res.status === "red" || res.status === "yellow") && (
                        <img
                          src={
                            (res.status === "red" && circle_x) ||
                            (res.status === "yellow" && clock_pause)
                          }
                          alt=""
                          height={31}
                          width={31}
                        />
                      )}
                    </div>
                  )}

                  <div
                    className={`${
                      props.SelectComment === "activeComments" ? "mt-5" : "mt-3"
                    } row gap-1 g-0 text-center`}
                  >
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
                <div
                  className="p-1 my-2 content-font"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  }}
                >
                  {res?.comment}
                </div>
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
                        className="pe-1"
                        src={TurkeyFalg}
                        alt=""
                        height={25}
                        width={27}
                      />
                      <span className="ps-1">{res?.league}</span>
                    </span>
                    <span
                      style={{
                        paddingRight:
                          props.SelectComment === "activeComments"
                            ? "83px"
                            : "83px",
                      }}
                    >
                      {res?.date}
                    </span>
                    <span></span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <span>{res?.match_detail.split(" - ")[0]}</span>
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
                        // text={res.time}
                        text="1-1"
                        styles={buildStyles({
                          rotation: 1 / 2 + 1 / 8,
                          textColor:
                            currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                          textSize: "26px",
                          pathColor:
                            currentTheme === "dark"
                              ? res.status === "green"
                                ? "#37FF80"
                                : res.status === "yellow"
                                ? "#FFCC00"
                                : res.status === "red"
                                ? "#FF5757"
                                : ""
                              : res.status === "green"
                              ? res.color
                              : res.status === "yellow"
                              ? res.color
                              : res.status === "red"
                              ? res.color
                              : "",
                        })}
                      />
                    </div>
                    <span>{res?.match_detail.split(" - ")[1]}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                    <span
                      className="ps-1"
                      style={{ color: "#FF3030", fontSize: "12px" }}
                    >
                      {res.text}
                    </span>
                    <span
                      className="p-1"
                      style={{
                        backgroundColor:
                          currentTheme === "dark"
                            ? res.status === "green"
                              ? "#37FF80"
                              : res.status === "yellow"
                              ? "#FFCC00"
                              : res.status === "red"
                              ? "#FF5757"
                              : ""
                            : res.status === "green"
                            ? res.color
                            : res.status === "yellow"
                            ? res.color
                            : res.status === "red"
                            ? res.color
                            : "",
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
                  <div
                    className="gap-2 d-flex align-items-center"
                    style={{ fontSize: "13px" }}
                  >
                    <div
                      onClick={() => {
                        handleCommentReaction(res?.id, "like");
                      }}
                    >
                      {/* <img
                        src={`${
                          currentTheme === "dark" ? likeIcondark : likeIcon
                        }`}
                        alt=""
                        height={20}
                        width={20}
                      />{" "} */}
                      {props.cmtReact
                        ?.map((e) => e.comment_id)
                        ?.includes(res?.id) ? (
                        props.cmtReact.filter((e) => e.comment_id == res?.id)[0]
                          .like == 1 ? (
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
                    <div
                      onClick={() => {
                        handleCommentReaction(res?.id, "favorite");
                      }}
                    >
                      {/* <img
                        src={`${
                          currentTheme === "dark" ? starIcondark : starIcon
                        }`}
                        alt=""
                        height={23}
                        width={23}
                      />{" "} */}
                      {props.cmtReact
                        ?.map((e) => e.comment_id)
                        ?.includes(res?.id) ? (
                        props.cmtReact.filter((e) => e.comment_id == res?.id)[0]
                          .favorite == 1 ? (
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
                    <div
                      onClick={() => {
                        handleCommentReaction(res?.id, "clap");
                      }}
                    >
                      {/* <img
                        src={currentTheme === "dark" ? clapIcon : clapLight}
                        alt=""
                        height={20}
                        width={20}
                      />{" "} */}
                      {props.cmtReact
                        ?.map((e) => e.comment_id)
                        ?.includes(res?.id) ? (
                        props.cmtReact.filter((e) => e.comment_id == res?.id)[0]
                          .clap == 1 ? (
                          <img src={clapIcon1} alt="" height={20} width={20} />
                        ) : (
                          <img src={clapIcon} alt="" height={20} width={20} />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <img src={clapIcon} alt="" height={20} width={20} />
                      )}{" "}
                      {res?.total_reactions?.total_clap}
                    </div>
                  </div>
                  <div className="ms-auto" style={{ fontSize: "12px" }}>
                    10 dk önce
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default CommentsContentSection;
