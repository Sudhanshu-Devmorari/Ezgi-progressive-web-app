import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";

const SubUsesTimeLine = () => {
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
    <div className="dark-mode p-2 sidebar-height" style={{ height: "90vh" }}>
      <div className="" style={{ fontSize: "1.2rem" }}>
        User Timeline
      </div>
      {users.map((res, index) => (
        <div key={index}
          className="d-flex gap-1 my-2 pb-2"
          style={{ borderBottom: "0.2px solid #E6E6E6" }}
        >
          <div>
            <img src={res.profile} alt="" height={45} width={45} />
          </div>
          <div className=" flex-grow-1 d-flex flex-column">
            <div className="d-flex gap-2 align-items-center">
              <div className="username">johndoe</div>
              <div>
                <button
                  style={{
                    fontSize: ".68rem",
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                    border:
                      (res.btn === "Financial" && "1px solid #58DEAA") ||
                      (res.btn === "Support" && "1px solid #4DD5FF") ||
                      (res.btn === "Ads Manager" && "1px solid #FFEE7D") ||
                      (res.btn === "Director Manager" && "1px solid #FF33E4"),
                    color:
                      (res.btn === "Financial" && "#58DEAA") ||
                      (res.btn === "Support" && "#4DD5FF") ||
                      (res.btn === "Ads Manager" && "#FFEE7D") ||
                      (res.btn === "Director Manager" && "#FF33E4"),
                  }}
                >
                  {res.btn}
                </button>
              </div>
              <div
                className="support-history-fonts ms-auto"
                style={{ fontSize: "0.85rem" }}
              >
                10 min ago
              </div>
            </div>
            <span
              className="support-history-fonts"
              style={{ fontSize: "0.85rem" }}
            >
              {formatContent(res.content)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubUsesTimeLine;
