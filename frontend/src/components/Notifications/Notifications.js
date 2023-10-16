import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import { formatTimeDifference } from "../FormatTime";

const Notifications = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [unreadNotificationsIds, setUnreadNotificationsIds] = useState([]);

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
    userId && getNotifications();
  }, [userId]);

  useEffect(() => {
    if (unreadNotificationsIds.length !== 0 && userId) {
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
          key={index}
          className={`card p-2 my-2 border-0 rounded-0 ${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          }`}
          style={{ fontSize: "13px" }}
        >
          <div className="d-flex">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={
                res?.sender?.profile_pic
                  ? `${config.apiUrl}${res?.sender?.profile_pic}`
                  : initialProfile
              }
              alt=""
              height={42}
              width={42}
              style={{ borderRadius: "50%" }}
            />
            <div className="d-flex flex-column ps-1" style={{ width: "66%" }}>
              <span>{ res?.subject === 'Support ticket' ? 'Support' : res?.sender?.username}</span>
              <span style={{ fontSize: "10px" }}>{res?.context}</span>
            </div>
            <div className="ms-auto mt-2 text-end">
              {formatTimeDifference(res?.created)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notifications;
