import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./MySubscribers.css";

const MySubscribers = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

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

  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2 pb-5 fonts`}
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
                    className="px-3 me-2"
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
            {subscriptions.map((sub, index) => (
              <div
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
                  <img src={profile} alt="" height={38} width={38} />
                  <span className="ps-1">{sub.name}</span>
                </div>
                <div className="">
                  <span>3 Ay</span>
                  <span className="px-2">22.04.2023 - 16:41</span>
                  <button
                    className="me-2 button-status"
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
                      width: "4.6rem",
                    }}
                  >
                    {sub.status}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MySubscribers;
