import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";
import initialProfile from "../../assets/profile.png";

const Notifications = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [unreadNotificationsIds, setUnreadNotificationsIds] = useState([]);
  const notification = [
    {
      profile: profile,
      name: "melih1905",
      content: "started following you",
      status: "10 min ago",
    },
    {
      profile: profile,
      name: "melih1905",
      content: "liked your Fenerbahçe - Galatasaray comment.",
      status: "10 min ago",
    },
    {
      profile: profile,
      name: "melih1905",
      content: "subscribe your profile",
      status: "10 min ago",
    },
    {
      profile: profile,
      name: "melih1905",
      content: "started following you",
      status: "10 min ago",
    },
  ];
  // Notification API
  const [notificationData, setNotificationData] = useState([]);
  useEffect(() => {
    function getNotifications() {
      axios
        .get(`${config.apiUrl}/notification/${userId}`)
        .then((res) => {
          const data = res?.data;
          const isRead = data.filter((res) => res?.status === false);
          const idsOfUnreadItems = isRead.map((item) => item.id);
          setUnreadNotificationsIds(idsOfUnreadItems);
          setNotificationData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getNotifications();
  }, []);

  useEffect(() => {
    if (unreadNotificationsIds && userId) {
      try {
        axios
          .post(`${config.apiUrl}/notification/${userId}`, {
            "update-status": unreadNotificationsIds,
          })
          .then((res) => {
            // console.log(res, "===========>>>post");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [unreadNotificationsIds]);

  return (
    <>
      {notificationData?.map((res, index) => (
        <div
          className={`card p-2 my-2 border-0 rounded-0 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ fontSize: "13px" }}
        >
          <div className="d-flex">
            <img
              src={
                res?.sender?.profile_pic
                  ? `${config.apiUrl}${res?.sender?.profile_pic}`
                  : initialProfile
              }
              alt=""
              height={42}
              width={42}
            />
            <div
              className="d-flex flex-column mt-2 ps-1"
              style={{ width: "66%" }}
            >
              <span>{res?.sender?.username}</span>
              <span style={{ fontSize: "10px" }}>{res?.context}</span>
            </div>
            <div className="ms-auto mt-2">{res?.time_since_created}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notifications;
