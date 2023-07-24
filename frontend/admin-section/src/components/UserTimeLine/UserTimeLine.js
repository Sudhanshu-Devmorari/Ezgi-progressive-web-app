import React, { useState } from "react";
import user1 from '../../assets/user1.png'
import user2 from '../../assets/user2.png'
import user3 from '../../assets/user3.png'
import user4 from '../../assets/user4.png'
import user5 from '../../assets/user5.png'
import user6 from '../../assets/user6.png'
import './UserTimeLine.css'

const UserTimeLine = () => {
    
  const notification = [
    {
      profile: user3,
      countPeople : "283",
      people : "people",
      name: "johndoe+",
      content: "Become a Editor viewed the pages",
      status: "10 min ago",
    },
    {
      profile: user2,
      countPeople : "283",
      people : "people",
      name: "johndoe+",
      content: "clap @johndoe Liverpool - Arsenal comment",
      status: "10 min ago",
    },
    {
      profile: user1,
      countPeople : "283",
      people : "people",
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
      <div className="dark-mode p-2" style={{height:"89vh"}}>
        <div className="" style={{fontSize:"1.5rem"}}>User Timeline</div>
        {notification.map((res, index) => (
          <div
            className="card py-1 my-2 rounded-0 dark-mode border-0 neha "
          >
            <div className="d-flex">
              <img src={res.profile} alt="" height={50} width={50} />
              <div
                className="d-flex flex-column mt-2 ps-1 div-width"
                style={{ width: "71%" }}
              >
                <span className="name-font" style={{ fontSize: "1.2rem" }}>{res.name}<span style={{color:"#0CC6FF"}}>{res.countPeople} </span><span>{res.people}</span></span>
                <span className="content-font" style={{ fontSize: "0.8rem" }}>
                  {highlightUsername(res.content, "@johndoe")}
                </span>
              </div>
              <div className="ms-auto mt-2 content-font" style={{ fontSize: "0.8rem" }}>{res.status}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTimeLine;
