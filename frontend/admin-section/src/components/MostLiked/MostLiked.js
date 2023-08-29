import React, { useEffect, useState } from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import likeIcon from "../../assets/heart.png";
import starIcon from "../../assets/star.png";
import clapIcon from "../../assets/clap-svgrepo-com.png";
import "./MostLiked.css";
import config from "../../config";
import initialProfile from "../../assets/profile.png";

const MostLiked = (props) => {
  // console.log("********", props?.mostLike)
  const [displayUser, setDisplayUser] = useState([]);

  useEffect(() => {
    setDisplayUser(props?.mostLike);
  }, [props?.mostLike]);

  // console.log("********", displayUser)

  const notification = [
    {
      profile: user3,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Jounrneyman",
    },
    {
      profile: user2,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Expert",
    },
    {
      profile: user1,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Jounrneyman",
    },
    {
      profile: user4,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Expert",
    },
    {
      profile: user5,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Jounrneyman",
    },
    {
      profile: user6,
      name: "johndoe",
      content: "Sheffield United West Bromwich",
      level: "Expert",
    },
  ];
  const server_url = `${config?.apiUrl}`;

  return (
    <div className="dark-mode p-2 mt-2 home-height" style={{ height: "64vh" }}>
      <div className="" style={{ fontSize: "1.2rem" }}>
        Most Liked
      </div>
      {displayUser?.map((res, index) => (
        <div className="card py-1 my-2 rounded-0 dark-mode border-0 neha">
          <div className="d-flex">
            <img
              className="profile-mostLiked user-profile"
              src={
                res.comment_data.commentator_user.profile_pic
                  ? server_url + res.comment_data.commentator_user.profile_pic
                  : initialProfile
              }
              alt=""
              height={45}
              width={45}
            />
            <div className="d-flex flex-column mt-2 ps-1">
              <span className="username" style={{ fontSize: "0.9rem" }}>
                {res.comment_data.commentator_user.username}{" "}
                <button
                  className="px-2 level-btn text-capitalize"
                  style={{
                    border:
                      (res.comment_data.commentator_user.commentator_level.toLowerCase() === "expert" && "1px solid #FF9100")  || 
                      (res.comment_data.commentator_user.commentator_level.toLowerCase() === "apprentice" && "1px solid #FFEE7D") || 
                      (res.comment_data.commentator_user.commentator_level.toLowerCase() === "journeyman" && "1px solid #0CC6FF") || 
                      (res.comment_data.commentator_user.commentator_level.toLowerCase() === "grandmaster" && "1px solid #D2DB08") ||
                      (res.comment_data.commentator_user.commentator_level.toLowerCase() === "master" && "1px solid #FF9100") ,
                    color:
                    (res.comment_data.commentator_user.commentator_level.toLowerCase() === "expert" && " #FF9100")  || 
                    (res.comment_data.commentator_user.commentator_level.toLowerCase() === "apprentice" && " #FFEE7D") || 
                    (res.comment_data.commentator_user.commentator_level.toLowerCase() === "journeyman" && " #0CC6FF") || 
                    (res.comment_data.commentator_user.commentator_level.toLowerCase() === "grandmaster" && " #D2DB08") ||
                    (res.comment_data.commentator_user.commentator_level.toLowerCase() === "master" && " #FF9100") ,
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                    fontSize: "0.7rem",
                  }}
                >
                  {res.comment_data.commentator_user.commentator_level}
                </button>
              </span>

              <span className="content-font1" style={{ fontSize: "0.7rem" }}>
                {/* {res.content} */}
                {res.comment_data.league}
              </span>
            </div>
            <div
              className="ms-auto mt-2 icons-font"
              style={{ fontSize: "0.9rem" }}
            >
              <span>
                <img
                  className="icons-mostLiked"
                  src={likeIcon}
                  alt=""
                  height={22}
                  width={22}
                />
                {res?.total_likes}
              </span>
              <span className="px-2 padding">
                <img
                  className="icons-mostLiked"
                  src={starIcon}
                  alt=""
                  height={22}
                  width={22}
                />
                {res?.total_favorites}
              </span>
              <span>
                <img
                  className="icons-mostLiked"
                  src={clapIcon}
                  alt=""
                  height={18}
                  width={18}
                />
                {res?.total_clap}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MostLiked;
