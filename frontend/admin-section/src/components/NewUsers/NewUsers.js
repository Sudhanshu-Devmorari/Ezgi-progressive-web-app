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
          }`}
          key={index}
          style={{ height: "25vh" }}
        >
          <div className="mt-2 d-flex flex-column align-items-center justify-content-center p-2">
            {item.icon && <img src={item.icon} alt="" height={45} width={45} />}
            <span style={{ fontSize: "1.2rem" }}>{item.label  || "New Users"}</span>
            <span style={{ fontSize: "1.6rem" }}>{item.count || props.total_user}</span>
          </div>
          {item.per && (
            <div className="d-flex align-items-end mt-3 p-2">
              <span className="" style={{ fontSize: "1rem" }}>
                <span
                  className=""
                  style={{ color: item.color, fontSize: "1.2rem" }}
                >
                  {item.per}
                  {item.rate_icon === "arrowUp" ? (
                    <HiArrowSmUp
                      fontSize={"1.4rem"}
                      style={{ marginBottom: "0.1rem" }}
                    />
                  ) : (
                    <HiArrowSmDown
                      fontSize={"1.4rem"}
                      style={{ marginBottom: "0.1rem" }}
                    />
                  )}
                </span>
                last day
              </span>
            </div>
          )}
        </div>
      ))}
      {totalArray?.map((item, index) => (
        <div
          className={`${"dark-mode p-2 new-user-height"}`}
          key={index}
          style={{ height: "25vh" }}
        >
          <div className="d-flex flex-column align-items-center py-3 mt-5">
            <span style={{ fontSize: "1.3rem" }}>{item.label}</span>
            <span style={{ fontSize: "1.6rem" }}>{item.count}</span>
          </div>
          {item.perWin && (
            <>
              <div
                className="d-flex justify-content-center rate-fonts align-items-end"
                style={{ fontSize: "1rem", gap: "2rem" }}
              >
                <div className="">
                  <span>
                    9.845{" "}
                    <span style={{ color: "#58DEAA" }}>
                      %22
                      <HiArrowSmUp
                        fontSize={"1.4rem"}
                        style={{ marginBottom: "0.1rem" }}
                      />
                    </span>
                  </span>
                </div>
                <div className="">
                  <span>
                    9.845{" "}
                    <span style={{ color: "#FF5757" }}>
                      %22
                      <HiArrowSmDown
                        fontSize={"1.4rem"}
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
