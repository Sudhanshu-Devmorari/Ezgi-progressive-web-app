import React from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import './NewUsers.css'

const NewUsers = (props) => {
  const newArray = props.array;
  const totalArray = props?.totalArray;

  return (
    <>
      {newArray?.map((item, index) => (
        <div
          className={`${
            ((item.label === "New Comments" && props.comments === "commentsPage" && "dark-mode p-2" ) ||
            (item.label === "New Comments" && "dark-mode p-2 me-2" ) ||
            (item.label === "Daily Sales" && "dark-mode p-2 mb-3" ) ||
            (item.label === "New Withdrawal Request" && " dark-mode p-2 mb-3")) || "dark-mode p-2 me-3"
          }`}
          key={index}
        >
          <div className="d-flex flex-column align-items-center py-3 pt-4">
            {item.icon && (
            <img src={item.icon} alt="" height={60} width={60} />
            )}
            <span className="label-font" style={{fontSize:"1.5rem"}}>{item.label}</span>
            <span className="count-font" style={{ fontSize: "2.7rem" }}>
              {item.count}
            </span>
          </div>
          {item.per && (
            <span className="text-start rate-fonts" style={{fontSize:"1.4rem"}}>
              <span className="" style={{ color: item.color, fontSize:"1.4rem" }}>
                {item.per}
                {item.rate_icon === "arrowUp" ? (
                  <HiArrowSmUp
                    fontSize={"1.7rem"}
                    style={{ marginBottom: "0.1rem" }}
                  />
                ) : (
                  <HiArrowSmDown
                    fontSize={"1.7rem"}
                    style={{ marginBottom: "0.1rem" }}
                  />
                )}
              </span>
              last day
            </span>
          )}
        </div>
      ))}
      {totalArray?.map((item, index) => (
        <div
          className={`${ "dark-mode p-2 h-100"
          }`}
          key={index}
        >
          <div className="d-flex flex-column align-items-center py-3 mt-5">
            <span className="label-font" style={{fontSize:"1.5rem"}}>{item.label}</span>
            <span className="count-font" style={{ fontSize: "2.7rem" }}>
              {item.count}
            </span>
          </div>
          {item.perWin && (
            <>
            <div className="d-flex justify-content-center rate-fonts align-items-end" style={{fontSize:"1.4rem",gap:"2rem"}}>
              <div className="">
                <span>9.845 <span style={{color:"#58DEAA"}}>%22<HiArrowSmUp fontSize={"1.7rem"} style={{ marginBottom: "0.1rem" }}/></span></span>
              </div>
              <div className="">
                <span>9.845 <span style={{color:"#FF5757"}}>%22<HiArrowSmDown fontSize={"1.7rem"} style={{ marginBottom: "0.1rem" }}/></span></span>
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
