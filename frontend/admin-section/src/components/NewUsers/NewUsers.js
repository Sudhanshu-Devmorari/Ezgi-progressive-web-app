import React from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import "./NewUsers.css";

const NewUsers = (props) => {
  const newArray = props.array;
  const totalArray = props?.totalArray;

  return (
    <>
      {newArray?.map((item, index) => (
        <div
          className={`${
            (item.label === "New Comments" &&
              props.comments === "commentsPage" &&
              "dark-mode p-2 new-user-height") ||
            (item.label === "New Comments" &&
              item?.from === "comments" &&
              "mx-2 dark-mode p-2 new-user-height") ||
            (item.label === "New Comments" &&
              "dark-mode p-2 new-user-height") ||
            (item.label === "New Editors" &&
              item?.from === "editor" &&
              "mx-2 dark-mode p-2 me-2 new-user-height") ||
            (item.label === "New Editors" &&
              "dark-mode p-2 me-2 new-user-height") ||
            (item.label === "New Users" &&
              "dark-mode p-2 mx-2 new-user-height") ||
            "dark-mode p-2 me-2 new-user-height"
          } d-flex flex-column align-items-center justify-content-center`}
          key={index}
          style={{ height: "25vh" }}
        >
          {item.icon && <img className="icon" src={item.icon} alt="" />}
          <span className="heading">{item.label || "New Users"}</span>
          <span className="number">{item.count || props.total_user}</span>
          {/* {item.per && ( */}
          <div className="w-100">
            {item.per >= 0 ? (
              <span className="rate-font" style={{ color: "#58DEAA" }}>
                %{item.per}
                <HiArrowSmUp
                  className="arrow"
                  style={{ marginBottom: "0.1rem" }}
                />
              </span>
            ) : (
              <span className="rate-font" style={{ color: "#FF5757" }}>
                %{item.per}
                <HiArrowSmDown
                  className="arrow"
                  style={{ marginBottom: "0.1rem" }}
                />
              </span>
            )}
            last day
          </div>
          {/* )} */}
        </div>
      ))}
      {totalArray?.map((item, index) => (
        <div
          className="dark-mode p-2 new-user-height d-flex flex-column align-items-center justify-content-center"
          key={index}
          style={{ height: "25vh" }}
        >
          <span className="heading">{item.label}</span>
          <span className="number">{item.count}</span>
          {item.perWin && (
            <>
              <div
                className="d-flex justify-content-center rate-fonts align-items-end pt-3"
                style={{ gap: "2rem" }}
              >
                <div className="">
                  <span className="rate-font">
                    9.845{" "}
                    <span className="rate-font" style={{ color: "#58DEAA" }}>
                      %22
                      <HiArrowSmUp
                        className="arrow"
                        style={{ marginBottom: "0.1rem" }}
                      />
                    </span>
                  </span>
                </div>
                <div className="">
                  <span className="rate-font">
                    9.845{" "}
                    <span className="rate-font" style={{ color: "#FF5757" }}>
                      %22
                      <HiArrowSmDown
                        className="arrow"
                        style={{ marginBottom: "0.1rem" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default NewUsers;
