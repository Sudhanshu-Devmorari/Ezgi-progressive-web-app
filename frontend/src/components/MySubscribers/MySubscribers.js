import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./MySubscribers.css";
import SubscribeRenewModal from "../SubscribeRenewModal/SubscribeRenewModal";
import axios from "axios";
import { truncateString, userId } from "../GetUser";
import config from "../../config";
import SubscribeModal from "../SubscribeModal/SubscribeModal";

const MySubscribers = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [RenewModalShow, setRenewModalShow] = useState(false);

  // Subscription API
  const [mySubscribers, setMySubscribers] = useState([]);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getSubscriptions() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${config?.apiUrl}/retrieve-subscribers-subscription/${userId}`
        );
        if (res?.status === 200) {
          setMySubscribers(res?.data?.subscribers);
          setMySubscriptions(res?.data?.subscription);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSubscriptions();
  }, []);

  return (
    <>
      <div
        style={{ height: "250px", overflowY: "auto" }}
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2 pb-5 fonts-subscribers`}
      >
        {props.user === "commentator" && (
          <>
            {props?.subscribersOrSubscriptions === "My subscribers" && (
              <>
                {isLoading ? (
                  <div className="text-center mt-3">Loading...</div>
                ) : (
                  <>
                    {mySubscribers?.length == 0 ? (
                      <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                        No Record Found!
                      </div>
                    ) : (
                      <>
                        {mySubscribers?.map((res, index) => (
                          <div
                            key={index}
                            className="p-1 d-flex justify-content-between align-items-center mb-2"
                            style={{
                              backgroundColor:
                                currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                            }}
                          >
                            <div
                              className=""
                              onClick={() => {
                                const currentPage =
                                  localStorage.getItem("currentpage");
                                const currentuser =
                                  localStorage.getItem("user-role");
                                localStorage.setItem("dashboardShow", true);
                                (currentPage !== "show-all-comments" ||
                                  currentPage !== "notifications") &&
                                  localStorage.setItem(
                                    "priviouspage",
                                    currentPage
                                  );
                                localStorage.setItem(
                                  "currentpage",
                                  "show-all-comments"
                                );
                                localStorage.setItem(
                                  "subcurrentpage",
                                  "subscribers"
                                );
                                localStorage.setItem(
                                  "activeCommentId",
                                  res?.standard_user?.id
                                );
                                props?.setActiveCommentsshow(
                                  res?.standard_user?.id
                                );
                                props?.setDashboardSUser(false);
                                props?.setSelectContent("show-all-comments");
                              }}
                            >
                              <img
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                onContextMenu={(e) => e.preventDefault()}
                                src={
                                  res?.standard_user?.profile_pic
                                    ? `${config.apiUrl}${res?.standard_user?.profile_pic}`
                                    : profile
                                }
                                alt=""
                                height={35}
                                width={35}
                              />
                              <span className="ps-1">
                                {res.standard_user.username}
                              </span>
                            </div>
                            <div className="">
                              <span>{res?.duration}</span>
                              <span className="px-2">{res?.start_date}</span>
                              <button
                                className="px-2 me-2 text-uppercase"
                                style={{
                                  color:
                                    currentTheme === "dark"
                                      ? res.status === "active"
                                        ? "#37FF80"
                                        : res.status === "pending"
                                        ? "#4DD5FF"
                                        : res.status === "deactive"
                                        ? "#FF5757"
                                        : "#007BFC"
                                      : res.status === "active"
                                      ? "#00DE51"
                                      : res.status === "pending"
                                      ? "#007BFC"
                                      : res.status === "deactive"
                                      ? "#FF5757"
                                      : "#007BFC",
                                  backgroundColor:
                                    currentTheme === "dark"
                                      ? "#0D2A53"
                                      : "#FFFFFF",
                                  border:
                                    currentTheme === "dark"
                                      ? "1px solid #0D2A53"
                                      : "1px solid #FFFFFF",
                                  borderRadius: "3px",
                                  width: "4.4rem",
                                  fontSize: "12px",
                                }}
                              >
                                {res?.status == "deactive"
                                  ? "Ended"
                                  : res?.status}
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {props?.subscribersOrSubscriptions === "My subscriptions" && (
              <>
                {isLoading ? (
                  <div className="text-center mt-3">Loading...</div>
                ) : (
                  <>
                    {mySubscriptions?.length == 0 ? (
                      <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                        No Record Found!
                      </div>
                    ) : (
                      <>
                        {mySubscriptions?.map((res, index) => (
                          <div
                            className="p-1 d-flex justify-content-between align-items-center mb-2"
                            style={{
                              backgroundColor:
                                currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                            }}
                          >
                            <div
                              className=""
                              onClick={() => {
                                const currentPage =
                                  localStorage.getItem("currentpage");
                                const currentuser =
                                  localStorage.getItem("user-role");
                                localStorage.setItem("dashboardShow", true);
                                (currentPage !== "show-all-comments" ||
                                  currentPage !== "notifications") &&
                                  localStorage.setItem(
                                    "priviouspage",
                                    currentPage
                                  );
                                localStorage.setItem(
                                  "currentpage",
                                  "show-all-comments"
                                );
                                localStorage.setItem(
                                  "subcurrentpage",
                                  "subscribers"
                                );
                                localStorage.setItem(
                                  "activeCommentId",
                                  res?.commentator_user?.id
                                );
                                props?.setActiveCommentsshow(
                                  res?.commentator_user?.id
                                );
                                props?.setDashboardSUser(false);
                                props?.setSelectContent("show-all-comments");
                              }}
                            >
                              <div className="position-relative">
                                <img
                                  onContextMenu={(e) => e.preventDefault()}
                                  style={{
                                    position: "absolute",
                                    background:
                                      currentTheme === "dark"
                                        ? "#0D2A53"
                                        : "#FFFFFF",
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
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                onContextMenu={(e) => e.preventDefault()}
                                src={
                                  res?.commentator_user?.profile_pic
                                    ? `${config.apiUrl}${res?.commentator_user?.profile_pic}`
                                    : profile
                                }
                                alt=""
                                height={35}
                                width={35}
                              />
                              <span className="ps-1">
                                {res?.commentator_user?.username}
                              </span>
                            </div>
                            <div className="">
                              <span>{res?.duration}</span>
                              <span className="px-2">{res?.start_date}</span>
                              <button
                                // onClick={() => {
                                //   res.status === "Renew" &&
                                //     setRenewModalShow(true);
                                // }}
                                className="px-2 me-2 text-uppercase"
                                style={{
                                  color:
                                    currentTheme === "dark"
                                      ? res?.status === "pending"
                                        ? "#FFCC00"
                                        : res?.status === "active"
                                        ? "#37FF80"
                                        : res?.status === "deactive"
                                        ? "#4DD5FF"
                                        : ""
                                      : res?.status === "pending"
                                      ? "#FFCC00"
                                      : res?.status === "deactive"
                                      ? "#00659D"
                                      : res?.status === "active"
                                      ? "#00DE51"
                                      : "",
                                  backgroundColor:
                                    currentTheme === "dark"
                                      ? "#0D2A53"
                                      : "#FFFFFF",
                                  border:
                                    currentTheme === "dark"
                                      ? "1px solid #0D2A53"
                                      : "1px solid #FFFFFF",
                                  borderRadius: "3px",
                                  width: "4.4rem",
                                  fontSize: "12px",
                                }}
                              >
                                {res?.status == "deactive"
                                  ? "Ended"
                                  : res?.status}
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {props.user === "standard user" && (
          <>
            {isLoading ? (
              <div className="text-center mt-3">Loading...</div>
            ) : (
              <>
                {mySubscriptions?.length == 0 ? (
                  <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                    No Record Found!
                  </div>
                ) : (
                  <>
                    {mySubscriptions?.map((res, index) => (
                      <div
                        key={index}
                        className="p-1 d-flex justify-content-between align-items-center mb-2"
                        style={{
                          backgroundColor:
                            currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                        }}
                      >
                        <div
                          className=""
                          onClick={() => {
                            const currentPage =
                              localStorage.getItem("currentpage");
                            const currentuser =
                              localStorage.getItem("user-role");
                            localStorage.setItem("dashboardShow", true);
                            (currentPage !== "show-all-comments" ||
                              currentPage !== "notifications") &&
                              localStorage.setItem("priviouspage", currentPage);
                            localStorage.setItem(
                              "currentpage",
                              "show-all-comments"
                            );
                            localStorage.setItem(
                              "subcurrentpage",
                              "subscribers"
                            );
                            localStorage.setItem(
                              "activeCommentId",
                              res?.commentator_user?.id
                            );
                            props?.setActiveCommentsshow(
                              res?.commentator_user?.id
                            );
                            props?.setDashboardSUser(false);
                            props?.setSelectContent("show-all-comments");
                          }}
                        >
                          <div className="position-relative">
                            <img
                              onContextMenu={(e) => e.preventDefault()}
                              style={{
                                position: "absolute",
                                background:
                                  currentTheme === "dark"
                                    ? "#0D2A53"
                                    : "#FFFFFF",
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
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            onContextMenu={(e) => e.preventDefault()}
                            src={
                              res?.commentator_user?.profile_pic
                                ? `${config.apiUrl}${res?.commentator_user?.profile_pic}`
                                : profile
                            }
                            alt=""
                            height={35}
                            width={35}
                          />
                          <span className="ps-1">
                            {res?.commentator_user?.username}
                          </span>
                        </div>
                        <div className="">
                          <span>{res?.duration}</span>
                          <span className="px-2">{res?.start_date}</span>
                          <button
                            // onClick={() => {
                            //   res.status === "Renew" &&
                            //     setRenewModalShow(true);
                            // }}
                            className="px-2 me-2 text-uppercase"
                            style={{
                              color:
                                currentTheme === "dark"
                                  ? res?.status === "pending"
                                    ? "#FFCC00"
                                    : res?.status === "active"
                                    ? "#37FF80"
                                    : res?.status === "deactive"
                                    ? "#4DD5FF"
                                    : ""
                                  : res?.status === "pending"
                                  ? "#FFCC00"
                                  : res?.status === "deactive"
                                  ? "#00659D"
                                  : res?.status === "active"
                                  ? "#00DE51"
                                  : "",
                              backgroundColor:
                                currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                              border:
                                currentTheme === "dark"
                                  ? "1px solid #0D2A53"
                                  : "1px solid #FFFFFF",
                              borderRadius: "3px",
                              width: "4.4rem",
                              fontSize: "12px",
                            }}
                          >
                            {res?.status == "deactive" ? "Ended" : res?.status}
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <SubscribeModal
        show={RenewModalShow}
        onHide={() => setRenewModalShow(false)}
        text="renew"
      />
      {/* <SubscribeRenewModal
        show={RenewModalShow}
        onHide={() => setRenewModalShow(false)}
      /> */}
    </>
  );
};

export default MySubscribers;
