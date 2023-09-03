import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import "./SupportHistory.css";
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import { parse, formatDistanceToNow } from "date-fns";

const SupportHistory = (props) => {
  const users = [
    {
      profile: user1,
      content: "responded to the request for financial support from @johndoe",
    },
    {
      profile: user1,
      content: "forwarded the technical support request to admin",
    },
    {
      profile: user1,
      content: "responded to the request for financial support from @johndoe",
    },
    {
      profile: user2,
      content: "forwarded the technical support request to admin",
    },
  ];
  const formatContent = (content) => {
    const parts = content.split("@");
    return (
      <>
        {parts[0]}
        {parts.length > 1 && (
          <>
            <span style={{ color: "#D2DB08" }}>@{parts[1].split(" ")[0]}</span>
            {parts[1].substring(parts[1].indexOf(" ") + 1)}
          </>
        )}
      </>
    );
  };

  function getStatusMessage(status, user, dept) {
    switch (status) {
      case "create":
        return `@${user}  raise a new ticket`;
      case "comment_by_user":
        return `responded to the request for ${dept.toLowerCase()} support from admin`;
      case "request_for_update":
        return `@${user}  replied for the same ticket`;
      case "redirect":
        return `forwarded the ${dept.toLowerCase()} support request to sub user`;
      default:
        return "Unknown status";
    }
  }

  function time(date) {
    const createdDate = parse(date, 'dd.MM.yyyy - HH:mm', new Date());
    const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
  
    // Remove "about" from the response
    return timeAgo.replace('about ', '');
  }

  return (
    <>
      <div className="dark-mode p-2 home-height">
        <div className="" style={{ fontSize: "1.2rem" }}>
          Support History
        </div>
        {props?.supportHistory?.map((res, index) => (
          <div
            key={index}
            className="d-flex gap-1 my-2 pb-2"
            style={{ borderBottom: "0.2px solid #E6E6E6" }}
          >
            <div>
              <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                src={
                  res?.user?.profile_pic
                    ? `${config?.apiUrl}${res.user.profile_pic}`
                    : initialProfile
                }
                alt=""
                height={45}
                width={45}
              />
            </div>
            <div className=" flex-grow-1 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span className="username">{res?.user?.username}</span>
                <span
                  className="support-history-fonts"
                  style={{ fontSize: "0.8rem" }}
                >
                  {/* {res?.ticket_support?.created} */}
                  {time(res?.ticket_support?.created)}
                </span>
              </div>
              <span
                className="support-history-fonts"
                style={{ fontSize: "0.8rem" }}
              >
                {/* {formatContent(
                  "responded to the request for financial support from @johndoe"
                )} */}
                {formatContent(
                  getStatusMessage(
                    res?.status,
                    res?.user?.username,
                    res?.ticket_support?.department
                  )
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupportHistory;
