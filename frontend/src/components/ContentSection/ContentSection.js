import React, { useContext } from "react";
import { useState, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import blueTick from "../../assets/blueTick.png";
import likeIcon from "../../assets/like.png";
import starIcon from "../../assets/star-1.svg";
import likeIcondark from "../../assets/LikeDark.png";
import starIcondark from "../../assets/star.svg";
import clapIcon from "../../assets/Path 4530.png";
import clapIcon1 from "../../assets/clap-svgrepo-com.png";
import clapLight from "../../assets/Path 4537.png";
import world_check_light from "../../assets/world-check.png";
import world_check from "../../assets/world-check.svg";
import TurkeyFalg from "../../assets/flagTurk.png";
import lock from "../../assets/lock.svg";
import darklock from "../../assets/darklock.svg";
import starDarkLogin from "../../assets/star-1.png";
import "./ContentSection.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import initialProfile from "../../assets/profile.png";
import config from "../../config";
import { userId } from "../GetUser";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";
import { GoStar, GoStarFill } from "react-icons/go";
import Swal from "sweetalert2";

const ContentSection = ({
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
}) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const userPhone = localStorage.getItem("user-id");

  // console.log(data,"=================>>>data");
  // console.log("FavData", props?.FavData);

  // const userPhone = localStorage.getItem("userPhone");

  const server_url = `${config.apiUrl}`;

  const [followLabel, setFollowLabel] = useState("Follow");

  const followCommentator = async (commentator_id) => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
      );
      if (res.statusText === "OK") {
        const user_id = localStorage.getItem("user-id");
        homeApiData(user_id);
        // console.log("Follow Response------", followLabel);
        if (followLabel !== "Follow") {
          const confirmation = await Swal.fire({
            title: followLabel === "Follow" ? "Follow?" : "Unfollow?",
            text:
              followLabel === "Follow"
                ? "Are you sure you want to follow this commentator?"
                : "Are you sure you want to unfollow this commentator?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          });
          console.log(confirmation.value);
          if (confirmation.value === true) {
            setFollowLabel(() =>
              followLabel === "Follow" ? "Followed" : "Follow"
            );
            Swal.fire({
              title: "You have Unfollowed",
              icon: "success",
            });
          }
        } else {
          setFollowLabel(() =>
            followLabel === "Follow" ? "Followed" : "Follow"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

  const [likeCount, setLikeCount] = useState("");
  const [favoriteCount, setFavoriteCount] = useState("");
  const [clapCount, setClapCount] = useState("");
  const handleCommentReaction = async (id, reaction, count) => {
    // if(reaction === "like")
    //   setLikeCount(count)
    // else if(reaction === "favorite")
    //   setFavoriteCount(count)
    // else if(reaction === "clap")
    //   setClapCount(count)

  localStorage.setItem(`${id}_${reaction}`, count);
    const res = await axios.post(
      `${config?.apiUrl}/comment-reaction/${id}/${userId}`,
      {
        reaction_type: `${reaction}`,
      }
    );
      // const user_id = localStorage.getItem("user-id");
      homeApiData(userId);
    
  };

  // useEffect(() => {
  //   // Retrieve the reaction data from local storage and update state variables
  //   const likeCount = localStorage.getItem(`${data?.value.id}_like`);
  //   const favoriteCount = localStorage.getItem(`${data?.value.id}_favorite`);
  //   const clapCount = localStorage.getItem(`${data?.value.id}_clap`);

  //   setLikeCount(likeCount || '');
  //   setFavoriteCount(favoriteCount || '');
  //   setClapCount(clapCount || '');
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${config?.apiUrl}/comment-reaction/${data?.value.id}/${userId}`,
  //         {
  //           reaction_type:"like",
  //         }
  //       );
  //       // const response = await axios.get(`${config?.apiUrl}/comment-reaction/${data?.value.id}/${userId}`);

  //       if (response.status === 200) {
  //         console.log("Response from fetch",response.data)
  //         // const { total_likes, total_favorites, total_claps } = response.data;
  //         // setLikeCount(total_likes);
  //         // setFavoriteCount(total_favorites);
  //         // setClapCount(total_claps);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Fetch data when the component mounts

  // }, [data?.value.id, userId]);
  return (
    <>
      {/* {data?.Public_Comments?.map((comment) => ( */}
      <>
        <div
          className={`card border-0 rounded-0 mb-2 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="row m-2">
            <div
              className="position-relative col p-0"
              onClick={() => {
                if (userId) {
                  setSelectContent("show-all-comments");
                  setActiveCommentsshow(data?.value.commentator_user?.id);
                } else {
                  Swal.fire({
                    // title: "Success",
                    text: "You need to become a member to be able to view it.",
                    // icon: "success",
                    backdrop: false,
                    customClass: `${
                      currentTheme === "dark"
                        ? "dark-mode-alert"
                        : "light-mode-alert"
                    }`,
                  });
                }
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
                  src={`${
                    data?.value.commentator_user?.profile_pic
                      ? config.apiUrl +
                        data?.value.commentator_user?.profile_pic
                      : initialProfile
                  }`}
                  className="rounded-circle"
                  width={75}
                  height={75}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                <span className="p-1 autorname-responsive">
                  {data?.value?.commentator_user?.username}
                </span>
                {/* <img src={(verifyid).includes(data?.value.commentator_user.id) ? blueTick : } alt="" width={16} height={16} /> */}
                {verifyid?.includes(data?.value?.commentator_user?.id) && (
                  <img src={blueTick} alt="" width={16} height={16} />
                )}
              </div>
            </div>
            <div className="col p-0">
              {(selectContent === "for you" ||
                userComments ||
                selectContent === "comments") && (
                <div
                  className="d-flex justify-content-end pe-2 mt-3"
                  style={{ height: "24.69px" }}
                >
                  {userPhone ? (
                    <button
                      onClick={() => {
                        followCommentator(data?.value.commentator_user.id);
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
                      {/* {followLabel ? followLabel : "Follow"} */}
                      {followingid?.includes(data?.value?.commentator_user?.id)
                        ? "Followed"
                        : "Follow"}
                      {/* {(followingid).includes(data?.value.commentator_user.id) ? setFollowLabel('Followed') : setFollowLabel('Follow')} */}
                    </button>
                  ) : (
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
                      {followLabel ? followLabel : "Follow"}
                    </button>
                  )}
                </div>
              )}
              <div className={`${"mt-3"} row gap-1 g-0 text-center`}>
                <div className="col">
                  <div className="rate-fonts">Success Rate</div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                    }}
                  >
                    %{data?.value?.commentator_user?.success_rate}
                  </div>
                </div>
                <div className="col">
                  <div className="rate-fonts">Score Points</div>
                  <div style={{ fontSize: "1rem", color: "#FFA200" }}>
                    {data?.value?.commentator_user?.score_points}
                  </div>
                </div>
              </div>
            </div>

            {userPhone === null ? (
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
            ) : (
              <>
                <div
                  // onClick={() => setSelectContent("show-all-comments")}
                  className="p-1 my-2 content-font"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  }}
                >
                  {data?.value.comment}
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
                  <span className="ps-1">{data?.value.league}</span>
                </span>
                <span style={{ paddingRight: userPhone ? "47px" : "80px" }}>
                  {data?.value.date}
                </span>
                <span>
                  {userPhone === null ? null : (
                    <>
                      {data?.value.public_content ? (
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
                        </>
                      ) : null}
                    </>
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <span className="mt-2 pt-1">
                  {data?.value.match_detail.split(" - ")[0]}
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
                  {data?.value.match_detail.split(" - ")[1]}
                </span>
              </div>
              <div className="text-end mt-3 mb-2">
                <span
                  className={`p-1 ${userPhone === null && "px-2"}`}
                  style={{
                    backgroundColor:
                      SelectComment === "resolvedComments"
                        ? "#00DE51"
                        : "#00659D",
                    color:
                      SelectComment === "resolvedComments"
                        ? "#0D2A53"
                        : "#FFFFFF",
                    fontSize: "12px",
                  }}
                >
                  {userPhone ? "FT - Home & 2.5 Over 2.40" : "Subscribers Only"}
                </span>
              </div>
            </div>

            <div className="d-flex mt-2 align-items-center">
              <div
                className="gap-2 d-flex align-items-center"
                style={{ fontSize: "13px" }}
              >
                {userPhone ? (
                  <div
                    onClick={() => {
                      handleCommentReaction(
                        data?.value.id,
                        "like",
                        data?.value.total_reactions.total_likes
                      );
                    }}
                  >
                    <div>
                      {cmtReact?.map((e)=>e.comment_id)?.includes(data?.value.id) ? (
                        cmtReact.filter((e)=>e.comment_id==data.value.id)[0].like == 1 ? (
                          <PiHeartStraightFill size={25} color="#ff3030" />
                        ) : (
                          <PiHeartStraight size={25} color="#ff3030" />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <PiHeartStraight size={25} color="#ff3030" />
                      )}{" "}
                      {data?.value.total_reactions.total_likes}
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={`${
                        currentTheme === "dark" ? likeIcondark : likeIcon
                      }`}
                      alt=""
                      height={20}
                      width={20}
                    />{" "}
                    {data?.value.total_reactions.total_likes}
                  </div>
                )}

                {userPhone ? (
                  <div
                    onClick={() => {
                      handleCommentReaction(
                        data?.value.id,
                        "favorite",
                        data?.value.total_reactions.total_favorite
                      );
                    }}
                  >
                    {/* <img
                      src={`${
                        currentTheme === "dark" ? starDarkLogin : starIcon
                      }`}
                      alt=""
                      height={23}
                      width={23}
                    /> */}
                    {/* {favoriteCount >
                    data?.value.total_reactions.total_favorite ? (
                      <GoStar size={25} color="#ffcc00" />
                    ) : (
                      <GoStarFill size={25} color="#ffcc00" />
                    )}{" "} */}
                    {cmtReact?.map((e)=>e.comment_id)?.includes(data?.value.id) ? (
                        cmtReact.filter((e)=>e.comment_id==data.value.id)[0].favorite == 1 ? (
                          <GoStarFill size={25} color="#ffcc00" />
                        ) : (
                          <GoStar size={25} color="#ffcc00" />
                        )
                      ) : (
                        // <img src={likeIcondark} alt="" height={20} width={20} />
                        <GoStar size={25} color="#ffcc00" />
                      )}{" "}
                    {data?.value.total_reactions.total_favorite}
                  </div>
                ) : (
                  <div>
                    <img
                      src={`${
                        currentTheme === "dark" ? starIcondark : starIcon
                      }`}
                      alt=""
                      height={23}
                      width={23}
                    />{" "}
                    {data?.value.total_reactions.total_favorite}
                  </div>
                )}

                {userPhone ? (
                  <div
                    onClick={() => {
                      handleCommentReaction(
                        data?.value.id,
                        "clap",
                        data?.value.total_reactions.total_clap
                      );
                    }}
                  >
                    {/* <img
                      src={currentTheme === "dark" ? clapIcon : clapLight}
                      alt=""
                      height={20}
                      width={20}
                    /> */}
                    {/* <img
                      src={
                        currentTheme === "dark"
                          ? clapCount > data?.value.total_reactions.total_clap
                            ? clapIcon
                            : clapIcon1
                          : clapCount > data?.value.total_reactions.total_clap
                          ? clapIcon
                          : clapIcon1
                      }
                      alt=""
                      height={20}
                      width={20}
                    />{" "} */}
                    {cmtReact?.map((e)=>e.comment_id)?.includes(data?.value.id) ? (
                        cmtReact.filter((e)=>e.comment_id==data.value.id)[0].clap == 1 ? (
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
                    {data?.value.total_reactions.total_clap}
                  </div>
                ) : (
                  <div>
                    <img
                      src={currentTheme === "dark" ? clapIcon : clapLight}
                      alt=""
                      height={20}
                      width={20}
                    />{" "}
                    {data?.value.total_reactions.total_clap}
                  </div>
                )}
              </div>
              <div className="ms-auto" style={{ fontSize: "12px" }}>
                {selectContent === "for you" ||
                  (selectContent === "comments" &&
                    (userPhone ? (
                      <button
                        onClick={() => {
                          // setSelectContent("show-all-comments");
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
                        Subscribe
                      </button>
                    ) : (
                      <button
                        // onClick={() => setSelectContent("show-all-comments")}
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
                        Subscribe
                      </button>
                    )))}
                <span style={{ fontSize: "11px" }}>10 dk önce</span>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* ))
      } */}
    </>
  );
};

export default ContentSection;
