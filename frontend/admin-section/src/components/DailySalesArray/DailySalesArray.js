import React from "react";
import { HiArrowSmUp } from "react-icons/hi";
import sales from "../../assets/basket-1.svg";

const DailySalesArray = () => {
  return (
    <>
      <div className="dark-mode p-2 mt-2" style={{ height: "31vh" }}>
        <div className="mt-5 d-flex flex-column align-items-center justify-content-center p-2">
          <img src={sales} alt="" height={45} width={45} />
          <span className="name-fonts" style={{ fontSize: "1.2rem" }}>
            Daily 
          </span>
          <span style={{ fontSize: "1.6rem" }}>12.645 <small>₺</small></span>
        </div>
        <div className="d-flex align-items-end p-2 mt-2">
          <span className="" style={{ fontSize: "1rem" }}>
            <span className="" style={{ color: "#58DEAA", fontSize: "1.2rem" }}>
              %22
              <HiArrowSmUp
                fontSize={"1.4rem"}
                style={{ marginBottom: "0.1rem" }}
              />
            </span>
            last day
          </span>
        </div>
      </div>
    </>
  );
};

export default DailySalesArray;
