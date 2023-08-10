import React, { useEffect, useState } from "react";
import { MainDiv } from "../CommonBgRow";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import bell1 from "../../assets/bell-1.svg";
import bell2 from "../../assets/bell-2.svg";
import bell3 from "../../assets/bell-3.svg";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user1.png";
import user4 from "../../assets/user6.png";
import green_tick from "../../assets/checks-1.svg";
import yellow_tick from "../../assets/checks.svg";
import "./NotificationManagementPage.css";
import axios from "axios";

const NotificationManagementPage = () => {

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);

  const requestArray = [
    { img: bell2, name: "Viewed", count : viewedCount },
    { img: bell3, name: "Pending", count : pendingCount },
  ];
  const users = [
    {
      profile: user1,
      role: "Editor",
      plan: "Subscription",
      content: "Congratulations! @johndoe started you a 3 month subscription.",
      tick: yellow_tick,
    },
    {
      profile: user2,
      role: "Editor",
      plan: "Reminder",
      content:
        "Hi John, 3 days left until the subscription plan expires. You can renew your plan in the You can now make 20% off plan",
      tick: green_tick,
    },
    {
      profile: user3,
      role: "Editor",
      plan: "Subscription",
      content: "Congratulations! @johndoe started you a 3 month subscription.",
      tick: yellow_tick,
    },
    {
      profile: user4,
      role: "Standard User",
      plan: "Private",
      content:
        "Hi John, We have defined a special promotion for you. You can now make 20% off plan You can now make 20% off plan",
      tick: green_tick,
    },
    {
      profile: user1,
      role: "Subscriber",
      plan: "Reminder",
      content:
        "Hi John, We have defined a special promotion for you. You can now make 20% off plan You can now make 20% off plan",
      tick: green_tick,
    },
  ];

  // Get Notification API
  useEffect(() => {
    async function getNotificationsData() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/notification-management/"
        );
        console.log(res.data, "==========>>>res sub users");
        const data = res.data;
        setNotifications(data.notification);
        setNotificationCount(data.notification_count);
        setPendingCount(data.pending);
        setViewedCount(data.viewed);
      } catch (error) {
        console.log(error);
      }
    }
    getNotificationsData();
  }, []);

  const formatContent = (content) => {
    const parts = content.split(/(@\S+)/);
    return (
      <>
        {parts.map((part, index) =>
          part.startsWith("@") ? (
            <span key={index} style={{ color: "#D2DB08" }}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };
  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0" style={{ height: "25vh" }}>
              <div className="d-flex flex-column align-items-center justify-content-center col-3 dark-mode mx-2">
                <img src={bell1} alt="" height={45} width={45} />
                <span className="name-fonts" style={{ fontSize: "1.2rem" }}>
                  Notifications
                </span>
                <span style={{ fontSize: "1.6rem" }}>{notificationCount}</span>
              </div>
              <div className="col col p-0 dark-mode">
                <div className="row g-0 h-100">
                  {requestArray.map((res, index) => (
                    <div className="d-flex flex-column align-items-center justify-content-center col">
                      <img src={res.img} alt="" height={45} width={45} />
                      <span
                        className="name-fonts"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {res.name}
                      </span>
                      <span style={{ fontSize: "1.6rem" }}>{res.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center col-3 dark-mode mx-2">
                <span style={{ fontSize: "1.2rem" }}>Total</span>
                <span style={{ fontSize: "1.6rem" }}>658</span>
              </div>
            </div>
            <div className="dark-mode p-2 m-2 mb-0 home-height">
              {users.map((res, index) => (
                <MainDiv>
                  <>
                    <div className="col-2 d-flex align-items-center">
                      <span>#0001</span>
                      <span className="px-2">
                        <img src={res.profile} alt="" height={50} width={50} />
                      </span>
                      <span>johndoe</span>
                    </div>
                    <div className="col-1 d-flex align-items-center justify-content-center">
                      <button
                        className="px-2 role-btn"
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          border:
                            (res.role === "Subscriber" &&
                              "1px solid #58DEAA") ||
                            (res.role === "Editor" && "1px solid #FF9100") ||
                            (res.role === "Standard User" &&
                              "1px solid #3370FF"),
                          color:
                            (res.role === "Subscriber" && "#58DEAA") ||
                            (res.role === "Editor" && "#FF9100") ||
                            (res.role === "Standard User" && "#3370FF"),
                        }}
                      >
                        {res.role}
                      </button>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <button
                        className="px-2"
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          border:
                            (res.plan === "Subscription" &&
                              "1px solid #58DEAA") ||
                            (res.plan === "Reminder" && "1px solid #FFDD00") ||
                            (res.plan === "Private" && "1px solid #DD7DFF"),
                          color:
                            (res.plan === "Subscription" && "#58DEAA") ||
                            (res.plan === "Reminder" && "#FFDD00") ||
                            (res.plan === "Private" && "#DD7DFF"),
                        }}
                      >
                        {res.plan}
                      </button>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                      <div
                        className=""
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "700px",
                        }}
                      >
                        {formatContent(res.content)}
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end gap-2">
                      <div className="">15-06-2023 - 16:37</div>
                      <img src={res.tick} alt="" height={22} width={22} />
                    </div>
                  </>
                </MainDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationManagementPage;
