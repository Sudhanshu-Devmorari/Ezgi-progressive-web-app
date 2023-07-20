import React from "react";
// import { FaArrowUpLong } from "react-icons/fa"
import { HiArrowSmUp } from "react-icons/hi";

const NewUsers = (props) => {
  const newArray = props.array;

  return (
    <>
      {newArray.map((item, index) => (
        <div
          className={`dark-mode p-2 ${
            (item.label === "New Comments" ? "" : "me-2" ) ||(item.label === "Daily Sales" && "mb-2"  )
          }`}
          key={index}
        >
          <div className="d-flex flex-column align-items-center py-3 pt-4">
            <img src={item.icon} alt="" height={33} width={33} />
            <span>{item.label}</span>
            <span className="fw-bold" style={{ fontSize: "1rem" }}>
              {item.count}
            </span>
          </div>
          {item.per && (
            <span className="text-start">
              <span className="" style={{ color: item.color }}>
                {item.per}
                <HiArrowSmUp
                  fontSize={"1rem"}
                  style={{ marginBottom: "0.1rem" }}
                />
              </span>
              last day
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default NewUsers;
