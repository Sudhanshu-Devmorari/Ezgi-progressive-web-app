import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import likeIcon from "../../assets/heart.png";
import starIcon from "../../assets/star.png";
import clapIcon from "../../assets/clap-svgrepo-com.png";
import './MostLiked.css'

const MostLiked = () => {
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
  return (
    <div className="dark-mode p-2 mt-2 home-height" style={{height:"64vh"}}>
      <div className="" style={{ fontSize: "1.2rem" }}>
        Most Liked
      </div>
      {notification.map((res, index) => (
        <div className="card py-1 my-2 rounded-0 dark-mode border-0 neha">
          <div className="d-flex">
            <img className="profile-mostLiked" src={res.profile} alt="" height={50} width={50} />
            <div
              className="d-flex flex-column mt-2 ps-1"
            >
              <span className="name-font1" style={{ fontSize: "0.9rem" }}>
                {res.name}{" "}
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
                  {res.level}
                </button>
              </span>
              <span className="content-font1" style={{ fontSize: "0.7rem" }}>{res.content}</span>
            </div>
            <div className="ms-auto mt-2 icons-font" style={{ fontSize: "0.9rem" }}>
              <span><img className="icons-mostLiked" src={likeIcon} alt="" height={22} width={22} />238</span>
              <span className="px-2 padding"><img className="icons-mostLiked" src={starIcon} alt="" height={22} width={22} />238</span>
              <span><img className="icons-mostLiked" src={clapIcon} alt="" height={18} width={18} />238</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostLiked;
