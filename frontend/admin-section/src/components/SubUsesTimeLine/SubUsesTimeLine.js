import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import { parse, formatDistanceToNow } from "date-fns";

const SubUsesTimeLine = (props) => {
  const users = [
    {
      profile: user1,
      btn: "Support",
      content: "responded to the request for financial support from @johndoe",
    },
    {
      profile: user1,
      btn: "Financial",
      content: "forwarded the technical support request to admin",
    },
    {
      profile: user1,
      btn: "Financial",
      content: "responded to the request for financial support from @johndoe",
    },
    {
      profile: user2,
      btn: "Director Manager",
      content: "forwarded the technical support request to admin",
    },
  ];

  function getStatusMessage(status, user, dept) {
    switch (status) {
      case "comment_by_user":
        return (
          <>
            responded to the request for {dept.toLowerCase()} from
            <span style={{ color: "#D2DB08" }}> @{user}</span>
          </>
        );
      case "redirect":
        return `forwarded the ${dept.toLowerCase()} support request to sub user`;
      default:
        return "Unknown status";
    }
  }

  function time(date) {
    const createdDate = parse(date, "dd.MM.yyyy - HH:mm", new Date());
    const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

    // Remove "about" from the response
    return timeAgo.replace("about ", "");
  }

  const userTimeline = props?.userTimeline || [];
  // console.log(userTimeline,"============>>>userTimeline")

  return (
    <div className="dark-mode p-2 sidebar-height" style={{ height: "90vh" }}>
      <div className="" style={{ fontSize: "1.2rem" }}>
        User Timeline
      </div>
      {userTimeline.map((res, index) => (
        <div
          key={index}
          className="d-flex gap-1 my-2 pb-2"
          style={{ borderBottom: "0.2px solid #E6E6E6" }}
        >
          <div>
            <img
              src={
                res.profile_pic
                  ? `${config.apiUrl}${res.profile_pic}`
                  : initialProfile
              }
              alt=""
              height={45}
              width={45}
            />
          </div>
          <div className=" flex-grow-1 d-flex flex-column">
            <div className="d-flex gap-2 align-items-center">
              <div className="username">{res?.user?.username}</div>
              <div>
                {res?.user?.department && (
                  <button
                    style={{
                      fontSize: ".68rem",
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border:
                        (res?.user?.department === "Financial" &&
                          "1px solid #58DEAA") ||
                        (res?.user?.department === "Support" &&
                          "1px solid #4DD5FF") ||
                        (res?.user?.department === "Ads Manager" &&
                          "1px solid #FFEE7D") ||
                        (res?.user?.department === "Director Manager" &&
                          "1px solid #FF33E4"),
                      color:
                        (res?.user?.department === "Financial" && "#58DEAA") ||
                        (res?.user?.department === "Support" && "#4DD5FF") ||
                        (res?.user?.department === "Ads Manager" &&
                          "#FFEE7D") ||
                        (res?.user?.department === "Director Manager" &&
                          "#FF33E4"),
                    }}
                  >
                    {res?.user?.department}
                  </button>
                )}
              </div>
              <div
                className="support-history-fonts ms-auto"
                style={{ fontSize: "0.85rem" }}
              >
                {time(res?.ticket_support?.created)}
              </div>
            </div>
            <span
              className="support-history-fonts"
              style={{ fontSize: "0.85rem" }}
            >
              {/* {formatContent(res.content)} */}
              {/* {formatContent( */}
              {getStatusMessage(
                res?.status,
                res?.user?.username,
                res?.ticket_support?.department
              )}
              {/* )} */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubUsesTimeLine;
