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
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import moment from "moment";
import { useCookies } from "react-cookie";

const NotificationManagementPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState({
    notificatios: 0,
    pending: 0,
    viewed: 0,
    total: 0,
  });

  const requestArray = [
    { img: bell2, name: "Viewed", count: notificationsCount.viewed },
    { img: bell3, name: "Pending", count: notificationsCount.pending },
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
      const user_id = localStorage.getItem("admin-user-id")
      try {
        const res = await axios.get(
          `${config?.apiUrl}/notification-management/?admin_id=${user_id}`
        );
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        // console.log(res.data, "==========>>>res sub users");
        const data = res.data;
        setNotifications(data.notification);
        setNotificationsCount({
          ...notificationsCount,
          notificatios: data?.notification_count,
          pending: data?.pending,
          viewed: data?.viewed,
          total: data?.notification_count,
        });
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
                <img src={bell1} alt="" className="icon" />
                <span className="heading">Notifications</span>
                <span className="number">
                  {notificationsCount.notificatios}
                </span>
              </div>
              <div className="col col p-0 dark-mode">
                <div className="row g-0 h-100">
                  {requestArray.map((res, index) => (
                    <div className="d-flex flex-column align-items-center justify-content-center col">
                      <img src={res.img} alt="" className="icon" />
                      <span className="heading">{res.name}</span>
                      <span className="number">{res.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center col-3 dark-mode mx-2">
                <span className="heading">Total</span>
                <span className="number">
                  {notificationsCount.notificatios}
                </span>
              </div>
            </div>
            <div className="dark-mode p-2 m-2 mb-0 home-height">
              {notifications.map((res, index) => (
                <MainDiv>
                  <>
                    <div className="col-2 d-flex align-items-center">
                      <span className="pe-1">{`# ${(index + 1)
                        .toString()
                        .padStart(4, "0")}`}</span>
                      <span className="px-2">
                        <img
                        style={{objectFit: 'cover', borderRadius: '50%'}}
                          src={
                            res?.receiver?.profile_pic
                              ? `${config.apiUrl}${res?.receiver?.profile_pic}`
                              : initialProfile
                          }
                          alt=""
                          height={45}
                          width={45}
                        />
                      </span>
                      <span>{res?.receiver?.username}</span>
                    </div>
                    <div className="col-1 d-flex align-items-center justify-content-center">
                      <button
                        className="px-2 role-btn"
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          border:
                            (res?.receiver?.user_role === "Subscriber" &&
                              "1px solid #58DEAA") ||
                            (res?.receiver?.user_role === "commentator" &&
                              "1px solid #FF9100") ||
                            (res?.receiver?.user_role === "standard" &&
                              "1px solid #3370FF"),
                          color:
                            (res?.receiver?.user_role === "Subscriber" &&
                              "#58DEAA") ||
                            (res?.receiver?.user_role === "commentator" &&
                              "#FF9100") ||
                            (res?.receiver?.user_role === "standard" &&
                              "#3370FF"),
                        }}
                      >
                        {res?.receiver?.user_role === "commentator" && "Editor"}
                        {res?.receiver?.user_role === "standard" &&
                          "Standard User"}
                      </button>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      {(res?.subject === "Subscription Purchase" ||
                        res?.subject === "Subscription Plan Expires" ||
                        res?.subject === "Promotion") && (
                        <button
                          className="px-2"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            border:
                              (res.subject === "Subscription Purchase" &&
                                "1px solid #58DEAA") ||
                              (res.subject === "Subscription Plan Expires" &&
                                "1px solid #FFDD00") ||
                              (res.subject === "Private" &&
                                "1px solid #DD7DFF"),
                            color:
                              (res.subject === "Subscription" && "#58DEAA") ||
                              (res.subject === "Subscription Plan Expires" &&
                                "#FFDD00") ||
                              (res.subject === "Private" && "#DD7DFF"),
                          }}
                        >
                          {res.subject === "Subscription Plan Expires" &&
                            "Reminder"}
                          {res.subject === "Subscription Purchase" &&
                            "Subscription"}
                          {res.subject === "Promotion" && "Private"}
                        </button>
                      )}
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
                        {formatContent(res?.context)}
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end gap-2">
                      <div className="">{moment(res.created).format("DD-MM.YYYY - HH:mm")}</div>
                      <img
                        src={res?.status ? green_tick : yellow_tick}
                        alt=""
                        height={22}
                        width={22}
                      />
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
