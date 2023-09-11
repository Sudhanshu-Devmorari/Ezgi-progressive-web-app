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
  setArrayMerge,
  publicComments,
  setPublicComments,
  mergeArrays,
}) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [modalShow, setModalShow] = React.useState(false);

  const userPhone = localStorage.getItem("user-id");

  // console.log(data,"=================>>>data");
  // console.log("FavData", props?.FavData);

  // const userPhone = localStorage.getItem("userPhone");

  const server_url = `${config.apiUrl}`;

  const [followLabel, setFollowLabel] = useState("Follow");

  const followCommentator = async (commentator_id, isFollowing) => {
    try {
      // console.log("isFollowing",isFollowing)
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
          homeApiData(user_id);
        }
      } else {
        const res = await axios.get(
          `${config.apiUrl}/follow-commentator/${userId}?id=${commentator_id}`
        );
        // console.log("On Follow",res)
        const user_id = localStorage.getItem("user-id");
        homeApiData(user_id);
      }
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };
  // console.log("first: ", data)
  const [likeCount, setLikeCount] = useState("");
  const [favoriteCount, setFavoriteCount] = useState("");
  const [clapCount, setClapCount] = useState("");
  const generateRandomString = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };
  const handleCommentReaction = async (id, reaction, count) => {
    // if(reaction === "like")
    //   setLikeCount(count)
    // else if(reaction === "favorite")
    //   setFavoriteCount(count)
    // else if(reaction === "clap")
    //   setClapCount(count)

    const res = await axios.post(
      `${config?.apiUrl}/comment-reaction/${id}/${userId}`,
      {
        reaction_type: `${reaction}`,
      }
    );
    // if (res.status == 200) {
    //   console.log("res:::::::::::", res);
    //   console.log("props:::::::::::", publicComments);
    //   const filterdata = publicComments.filter((res) => res.id == id);
    //   console.log("filterdata::::::::::::::", filterdata[0].total_reactions);
    //   publicComments.filter(
    //     (res) => res.id == id
    //   )[0].total_reactions.total_clap = 501;

    //   console.log("publicComments::::::::::::::::::", publicComments);
    //   setPublicComments(publicComments);
    //   mergeArrays();
    // }
    const user_id = localStorage.getItem("user-id");
    console.log("user_id::::::::::::", user_id);
    homeApiData(user_id);
    mergeArrays();
    localStorage.setItem(`${id}_${reaction}`, count);
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
                  setActiveCommentsshow(data?.value?.commentator_user?.id);
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
                    data?.value?.commentator_user?.profile_pic
                      ? config.apiUrl +
                        data?.value?.commentator_user?.profile_pic
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
                        followCommentator(
                          data?.value?.commentator_user?.id,
                          followingid?.includes(
                            data?.value.commentator_user?.id
                          )
                        );
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
                  {data?.value?.comment}
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
                  <span className="ps-1">{data?.value?.league}</span>
                </span>
                <span style={{ paddingRight: userPhone ? "47px" : "80px" }}>
                  {data?.value?.date}
                </span>
                <span>
                  {userPhone === null ? null : (
                    <>
                      {data?.value?.public_content ? (
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
                  {data?.value?.match_detail?.split(" - ")[0]}
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
                  {data?.value?.match_detail?.split(" - ")[1]}
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
                        data?.value?.id,
                        "like",
                        data?.value?.total_reactions?.total_likes
                      );
                    }}
                  >
                    <div>
                      {cmtReact
                        ?.map((e) => e?.comment_id)
                        ?.includes(data?.value?.id) ? (
                        cmtReact?.filter(
                          (e) => e?.comment_id == data?.value?.id
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
                      {data?.value?.total_reactions?.total_likes}
                    </div>
                  </div>
                ) : (
                  <div>
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
                    {data?.value?.total_reactions?.total_likes}
                  </div>
                )}

                {userPhone ? (
                  <div
                    onClick={() => {
                      handleCommentReaction(
                        data?.value?.id,
                        "favorite",
                        data?.value?.total_reactions?.total_favorite
                      );
                    }}
                  >
                    {cmtReact
                      ?.map((e) => e?.comment_id)
                      ?.includes(data?.value?.id) ? (
                      cmtReact?.filter(
                        (e) => e?.comment_id == data?.value?.id
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
                    {data?.value?.total_reactions?.total_favorite}
                  </div>
                ) : (
                  <div>
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
                    {data?.value?.total_reactions?.total_favorite}
                  </div>
                )}

                {userPhone ? (
                  <div
                    onClick={() => {
                      handleCommentReaction(
                        data?.value?.id,
                        "clap",
                        data?.value?.total_reactions?.total_clap
                      );
                    }}
                  >
                    {cmtReact
                      ?.map((e) => e?.comment_id)
                      ?.includes(data?.value?.id) ? (
                      cmtReact?.filter(
                        (e) => e?.comment_id == data?.value?.id
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
                    {data?.value?.total_reactions?.total_clap}
                  </div>
                ) : (
                  <div>
                    <img
                      src={
                        currentTheme === "dark"
                          ? Dark_Unselected_Clap
                          : Light_Unselected_Clap
                      }
                      P
                      alt=""
                      height={20}
                      width={20}
                    />
                    {data?.value?.total_reactions?.total_clap}
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
                          setModalShow(true);
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
                        onClick={() => setModalShow(true)}
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
      <SubscribeModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default ContentSection;
