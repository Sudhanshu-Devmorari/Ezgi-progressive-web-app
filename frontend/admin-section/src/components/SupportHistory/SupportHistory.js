import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import './SupportHistory.css'

const SupportHistory = () => {
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
          <span style={{ color: "#D2DB08" }}>@{parts[1]}</span>
        )}
      </>
    );
  };
  return (
    <>
      <div className="dark-mode p-2" style={{ height: "65vh" }}>
        <div className="" style={{ fontSize: "1.2rem" }}>
          Support History
        </div>
        {users.map((res, index) => (
          <div
            className="d-flex gap-1 my-2 pb-2"
            style={{ borderBottom: "0.2px solid #E6E6E6" }}
          >
            <div>
              <img src={res.profile} alt="" height={45} width={45} />
            </div>
            <div className=" flex-grow-1 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span>johndoe</span>
                <span className="support-history-fonts" style={{ fontSize: "0.8rem" }}>10 min ago</span>
              </div>
              <span className="support-history-fonts" style={{ fontSize: "0.8rem" }}>
                {formatContent(res.content)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupportHistory;
