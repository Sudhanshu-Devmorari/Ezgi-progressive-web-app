import React, { useEffect,useState } from "react";
import initialProfile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import "./UserTimeLine.css";
import config from "../../config";
import moment from "moment";

const UserTimeLine = (props) => {
  const server_url = `${config?.apiUrl}`;

  const [displayTimelineData, setDisplayTimelineData] = useState(props?.notification);
  useEffect(() => {
    setDisplayTimelineData(props?.notification)
  }, [props?.notification]);

  const options = ["See All", "Purchase Transactions", "Interactions"];
  const [selectedOption, setSelectedOption] = useState("See All");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const filterData = (e) => {

      const filteredArray = props?.notification.filter(
          (obj) =>
            obj?.subject?.toLowerCase() == e?.toLowerCase()
        );
        // console.log(filteredArray)
        setDisplayTimelineData(e == "See All" ? props?.notification : filteredArray)
  };

  // const notification = [
  //   {
  //     profile: user3,
  //     countPeople: "283",
  //     people: "people",
  //     name: "johndoe+",
  //     content: "Become a Editor viewed the pages",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user2,
  //     countPeople: "283",
  //     people: "people",
  //     name: "johndoe+",
  //     content: "clap @johndoe Liverpool - Arsenal comment",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user1,
  //     countPeople: "283",
  //     people: "people",
  //     name: "johndoe+",
  //     content: "added  fovarites @johndoe Liverpool - Arsenal comment",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user4,
  //     name: "johndoe",
  //     content: "started following @johndoe",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user5,
  //     name: "melihjohndoe905",
  //     content: "viewed @johndoe profile",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user6,
  //     name: "johndoe",
  //     content: "subscribed for 3 months @johndoe",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user6,
  //     name: "johndoe",
  //     content: "upgrade a MASTER level",
  //     status: "10 min ago",
  //   },
  //   {
  //     profile: user6,
  //     name: "johndoe",
  //     content: "become a Editor",
  //     status: "10 min ago",
  //   },
  // ];
  const highlightUsername = (content) => {
    const parts = content.split(/(@\w+|Become a Editor|MASTER|Editor)/g);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part === "Become a Editor" ? (
              <span style={{ color: "#58DEAA" }}>{part}</span>
            ) : part === "MASTER" ? (
              <span style={{ color: "#FF9100" }}>{part}</span>
            ) : part === "Editor" ? (
              <span style={{ color: "#D2DB0B" }}>{part}</span>
            ) : part.startsWith("@") ? (
              <span style={{ color: "#FFDD00" }}>{part}</span>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const formatTimeDifference = (timestamp) => {
    const now = moment();
    const diff = moment(timestamp);
  
    if (now.diff(diff, "years") >= 1) {
      return diff.fromNow();
    } else if (now.diff(diff, "months") >= 1) {
      return diff.fromNow();
    } else if (now.diff(diff, "days") >= 1) {
      return diff.fromNow();
    } else {
      return diff.fromNow();
    }
  };
  
  
  return (
    <>
      <div className="dark-mode p-2 sidebar-height" style={{ height: "90vh" }}>
      <div className="d-flex" style={{alignItems:"center", justifyContent:"space-between"}}>
        <div style={{ fontSize: "1.2rem", alignItems: "center" }}>
          {props?.transactionHistory === "history"
            ? "Transaction History"
            : "User Timeline"}
        </div>
        
        {props?.transactionHistory !== "history" &&
        <div className="p-2 position-relative" style={{ justifyContent: "flex-end"}}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              backgroundColor: "transparent",
              borderRadius: "3px",
              border: "1px solid #E6E6E6",
              color: "#E6E6E6",
              width: "7.5rem",
              borderBottom: showDropdown
                ? "1px solid #0D2A53"
                : "1px solid #E6E6E6",
              borderLeft: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderRight: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
              borderTop: showDropdown
                ? "1px solid #E6E6E6"
                : "1px solid #E6E6E6",
            }}
          >
            {selectedOption}
          </button>
          <div
            className={`position-absolute d-flex flex-column ${
              showDropdown ? "d-block" : "d-none"
            }`}
            style={{
              backgroundColor: "#0B2447",
              border: "1px solid #E6E6E6",
              borderRadius: "3px",
              borderTop: "none",
            }}
          >
            {options
              .filter((option) => option !== selectedOption)
              .map((option) => (
                <span
                  key={option}
                  value={option}
                  className="m-1 px-2 py-1 text-center cursor"
                  style={{ backgroundColor: "#0D2A53", width: "6.9rem" }}
                  onClick={(e) => {handleOptionClick(option);
                    filterData(option)}}
                >
                  {option}
                </span>
              ))}
          </div>
        </div>}
        </div>
        {props.isLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-100 align-items-center justify-content-center">
            Loading...
          </div>
        ) : (
          <>
            {displayTimelineData?.map((res, index) => (
              <div
                key={index}
                className="d-flex gap-1 my-2 pb-2"
                style={{ borderBottom: "0.2px solid #E6E6E6" }}
              >
                <div>
                  <img
                    src={`${
                      res?.sender?.profile_pic
                        ? server_url + res?.sender?.profile_pic
                        : res?.receiver?.profile_pic ? server_url + res?.receiver?.profile_pic : initialProfile
                    }`}
                    className="rounded-circle"
                    alt=""
                    height={45}
                    width={45}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className=" flex-grow-1 d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <span className="username">{res?.sender?.name ? res?.sender?.name : res?.receiver?.name}</span>
                    <span
                      className="support-history-fonts"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {formatTimeDifference(res?.created)}
                    </span>
                  </div>
                  <span
                    className="support-history-fonts"
                    style={{ fontSize: "0.8rem" }}>
                    {res.admin_context != null && highlightUsername(
                      res?.admin_context,
                      `@${res?.receiver?.username}`
                    )}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserTimeLine;
