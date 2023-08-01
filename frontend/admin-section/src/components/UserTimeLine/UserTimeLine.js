import React, { useState } from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import "./UserTimeLine.css";

const UserTimeLine = (props) => {
  const notification = [
    {
      profile: user3,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "Become a Editor viewed the pages",
      status: "10 min ago",
    },
    {
      profile: user2,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "clap @johndoe Liverpool - Arsenal comment",
      status: "10 min ago",
    },
    {
      profile: user1,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "added  fovarites @johndoe Liverpool - Arsenal comment",
      status: "10 min ago",
    },
    {
      profile: user4,
      name: "johndoe",
      content: "started following @johndoe",
      status: "10 min ago",
    },
    {
      profile: user5,
      name: "melihjohndoe905",
      content: "viewed @johndoe profile",
      status: "10 min ago",
    },
    {
      profile: user6,
      name: "johndoe",
      content: "subscribed for 3 months @johndoe",
      status: "10 min ago",
    },
    {
      profile: user6,
      name: "johndoe",
      content: "upgrade a MASTER level",
      status: "10 min ago",
    },
    {
      profile: user6,
      name: "johndoe",
      content: "become a Editor",
      status: "10 min ago",
    },
  ];
  const highlightUsername = (content) => {
    const parts = content.split(/(@\w+|Become a Editor|MASTER|Editor)/g);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part === "Become a Editor" ? (
              <span style={{ color: "#58DEAA" }}>{part}</span>
            ) : part === "MASTER" ? (
              <span style={{ color: "#FF9100" }}>{part}</span>
            ) : part === "Editor" ? (
              <span style={{ color: "#D2DB0B" }}>{part}</span>
            ) : part.startsWith("@") ? (
              <span style={{ color: "#FFDD00" }}>{part}</span>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="dark-mode p-2 sidebar-height" style={{ height: "90vh" }}>
        <div className="" style={{ fontSize: "1.2rem" }}>
          {props?.transactionHistory === "history" ? (
            "Transaction History"
          ) : (
            "User Timeline"
          )}
        </div>
        {notification.map((res, index) => (
          <div
            className="d-flex gap-1 my-2 pb-2"
            style={{ borderBottom: "0.2px solid #E6E6E6" }}
          >
            <div>
              <img src={res.profile} alt="" height={45} width={45} />
            </div>
            <div className=" flex-grow-1 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span>johndoe</span>
                <span
                  className="support-history-fonts"
                  style={{ fontSize: "0.8rem" }}
                >
                  10 min ago
                </span>
              </div>
              <span
                className="support-history-fonts"
                style={{ fontSize: "0.8rem" }}
              >
                {highlightUsername(res.content, "@johndoe")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTimeLine;
