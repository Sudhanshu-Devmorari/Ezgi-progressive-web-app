import React, { useEffect,useState } from "react";
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

const MostLiked = (props) => {
  // console.log("********", props?.mostLike)
  const [displayUser, setDisplayUser] = useState([]);
  
  useEffect(() => {
    setDisplayUser(props?.mostLike);
  }, [props?.mostLike]);
  
  // console.log("********", displayUser)


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
  const server_url = "http://127.0.0.1:8000";

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
              src={res.profile}
              alt=""
              height={45}
              width={45}
            />
            <div className="d-flex flex-column mt-2 ps-1">
              <span className="username" style={{ fontSize: "0.9rem" }}>
              {res.comment_data.commentator_user.name}{" "}

                <button
                  className="px-2 level-btn"
                  style={{
                    border:
                      res.level === "Expert"
                        ? "1px solid #FF9100"
                        : "1px solid #0CC6FF",
                    color: res.level === "Expert" ? "#FF9100" : "#0CC6FF",
                    backgroundColor: "transparent",
                    borderRadius: "18px",
                    fontSize: "0.7rem",
                  }}
                >
                  {res.comment_data.commentator_user.commentator_level}
                </button>
              </span>

              <span className="content-font1" style={{ fontSize: "0.7rem" }}>
                {res.content}
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
                238
              </span>
              <span className="px-2 padding">
                <img
                  className="icons-mostLiked"
                  src={starIcon}
                  alt=""
                  height={22}
                  width={22}
                />
                238
              </span>
              <span>
                <img
                  className="icons-mostLiked"
                  src={clapIcon}
                  alt=""
                  height={18}
                  width={18}
                />
                238
              </span>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
}
export default MostLiked;
