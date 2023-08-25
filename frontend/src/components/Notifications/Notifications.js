import React, { useContext, useEffect } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png"
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";

const Notifications = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const notification = [
    {
        profile : profile,
        name : "melih1905",
        content : "started following you",
        status : "10 min ago"
    },
    {
        profile : profile,
        name : "melih1905",
        content : "liked your Fenerbahçe - Galatasaray comment.",
        status : "10 min ago"
    },
    {
        profile : profile,
        name : "melih1905",
        content : "subscribe your profile",
        status : "10 min ago"
    },
    {
        profile : profile,
        name : "melih1905",
        content : "started following you",
        status : "10 min ago"
    },
  ]
  // Notification API
  // useEffect(() => {
  //   async function getNotifications(){
  //     const res = await axios.get(`${config?.apiUrl}/notification/${userId}`)
  //     console.log(res,"==>>>>>>>>>");
  //   }
  //   getNotifications()
  // }, [])
  
  return (
    <>
    {notification.map((res,index)=>(
      <div
        className={`card p-2 my-2 border-0 rounded-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`} style={{fontSize:"13px"}}
      >
        <div className="d-flex">
            <img src={res.profile} alt="" height={42} width={42}/>
            <div className="d-flex flex-column mt-2 ps-1" style={{width:"66%"}}>
                <span>{res.name}</span>
                <span style={{fontSize:"10px"}}>{res.content}</span>
            </div>
            <div className="ms-auto mt-2">{res.status}</div>
        </div>
      </div>
    ))}
    </>
  );
};

export default Notifications;
