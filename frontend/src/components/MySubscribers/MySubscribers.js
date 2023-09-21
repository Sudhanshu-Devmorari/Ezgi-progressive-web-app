import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./MySubscribers.css";
import SubscribeRenewModal from "../SubscribeRenewModal/SubscribeRenewModal";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";
import SubscribeModal from "../SubscribeModal/SubscribeModal";

const MySubscribers = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [RenewModalShow, setRenewModalShow] = useState(false);

  const subscribers = [
    { name: "melih1905", status: "Active" },
    { name: "melih1905", status: "Pending" },
    { name: "melih1905", status: "Ended" },
    { name: "melih1905", status: "Active" },
    { name: "melih1905", status: "Pending" },
    { name: "melih1905", status: "Ended" },
  ];
  const subscriptions = [
    { name: "melih1905", status: "Pending" },
    { name: "melih1905", status: "Renew" },
    { name: "melih1905", status: "Active" },
    { name: "melih1905", status: "Renew" },
    { name: "melih1905", status: "Active" },
  ];

  // Subscription API
  const [subscriptiosData, setSubscriptiosData] = useState([]);
  useEffect(() => {
    async function getSubscriptions() {
      try {
        const res = await axios.get(
          `${config?.apiUrl}/retrieve-subscribers-subscription/${userId}`
        );
        console.log("res", res.data);
        setSubscriptiosData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubscriptions();
  }, []);

  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2 pb-5 fonts-subscribers`}
      >
        {props.user === "commentator" && (
          <>
            {props?.subscribersOrSubscriptions === "My subscribers" && (
              <>
                {subscribers.map((sub, index) => (
                  <div
                    className="p-1 d-flex justify-content-between align-items-center mb-2"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <div className="">
                      <img src={profile} alt="" height={35} width={35} />
                      <span className="ps-1">{sub.name}</span>
                    </div>
                    <div className="">
                      <span>3 Ay</span>
                      <span className="px-2">22.04.2023 - 16:41</span>
                      <button
                        className="px-2 me-2"
                        style={{
                          color:
                            currentTheme === "dark"
                              ? sub.status === "Active"
                                ? "#37FF80"
                                : sub.status === "Pending"
                                ? "#4DD5FF"
                                : sub.status === "Ended"
                                ? "#FF5757"
                                : "#007BFC"
                              : sub.status === "Active"
                              ? "#00DE51"
                              : sub.status === "Pending"
                              ? "#007BFC"
                              : sub.status === "Ended"
                              ? "#FF5757"
                              : "#007BFC",
                          backgroundColor:
                            currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                          border:
                            currentTheme === "dark"
                              ? "1px solid #0D2A53"
                              : "1px solid #FFFFFF",
                          borderRadius: "3px",
                          width: "4.4rem",
                        }}
                      >
                        {sub.status}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
            {props?.subscribersOrSubscriptions === "My subscriptions" && (
              <>
                {subscriptions.map((sub, index) => (
                  <div
                    className="p-1 d-flex justify-content-between align-items-center mb-2"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <div className="">
                      <div className="position-relative">
                        <img
                          style={{
                            position: "absolute",
                            background:
                              currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                            borderRadius: "50%",
                            left: "1.5rem",
                          }}
                          src={crown}
                          alt=""
                          height={13}
                          width={13}
                        />
                      </div>
                      <img src={profile} alt="" height={38} width={38} />
                      <span className="ps-1">{sub.name}</span>
                    </div>
                    <div className="">
                      <span>3 Ay</span>
                      <span className="px-2">22.04.2023 - 16:41</span>
                      <button
                        onClick={() => {
                          sub.status === "Renew" && setRenewModalShow(true);
                        }}
                        className="px-3 me-2 button-status"
                        style={{
                          color:
                            currentTheme === "dark"
                              ? sub.status === "Pending"
                                ? "#FFCC00"
                                : sub.status === "Active"
                                ? "#37FF80"
                                : sub.status === "Renew"
                                ? "#4DD5FF"
                                : ""
                              : sub.status === "Pending"
                              ? "#FFCC00"
                              : sub.status === "Renew"
                              ? "#00659D"
                              : sub.status === "Active"
                              ? "#00DE51"
                              : "",
                          backgroundColor:
                            currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                          border:
                            currentTheme === "dark"
                              ? "1px solid #0D2A53"
                              : "1px solid #FFFFFF",
                          borderRadius: "3px",
                        }}
                      >
                        {sub.status}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {props.user === "standard user" && (
          <>
            {subscriptiosData?.map((sub, index) => (
              <div
                key={index}
                className="p-1 d-flex justify-content-between align-items-center my-2"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                }}
              >
                <div className="">
                  <div className="position-relative">
                    <img
                      style={{
                        position: "absolute",
                        background:
                          currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                        borderRadius: "50%",
                        left: "1.5rem",
                      }}
                      src={crown}
                      alt=""
                      height={13}
                      width={13}
                    />
                  </div>
                  <img
                    src={`${config?.apiUrl}${sub?.commentator_user.profile_pic}`}
                    alt=""
                    height={38}
                    width={38}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <span className="ps-1">{sub?.commentator_user.username}</span>
                </div>
                <div className="">
                  <span>{sub.duration}</span>
                  {/* <span>3 Ay</span> */}
                  <span className="px-2">22.04.2023 - 16:41</span>
                  <button
                    className="me-2 button-status text-capitalize"
                    style={{
                      color:
                        currentTheme === "dark"
                          ? sub.commentator_user.commentator_status ===
                            "pending"
                            ? "#FFCC00"
                            : sub.commentator_user.commentator_status ===
                              "active"
                            ? "#37FF80"
                            : sub.commentator_user.commentator_status ===
                              "renew"
                            ? "#4DD5FF"
                            : ""
                          : sub.commentator_user.commentator_status ===
                            "pending"
                          ? "#FFCC00"
                          : sub.commentator_user.commentator_status === "renew"
                          ? "#00659D"
                          : sub.commentator_user.commentator_status === "active"
                          ? "#00DE51"
                          : "",
                      backgroundColor:
                        currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                      border:
                        currentTheme === "dark"
                          ? "1px solid #0D2A53"
                          : "1px solid #FFFFFF",
                      borderRadius: "3px",
                      width: "4.6rem",
                    }}
                  >
                    {sub?.commentator_user.commentator_status}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <SubscribeModal
        show={RenewModalShow}
        onHide={() => setRenewModalShow(false)}
        text='renew'
      />
      {/* <SubscribeRenewModal
        show={RenewModalShow}
        onHide={() => setRenewModalShow(false)}
      /> */}
    </>
  );
};

export default MySubscribers;
