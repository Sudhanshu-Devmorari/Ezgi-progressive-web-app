import React from "react";
import { HiArrowSmUp } from "react-icons/hi";
import sales from "../../assets/basket-1.svg";

const DailySalesArray = () => {
  return (
    <>
      <div className="dark-mode p-2 mt-2 d-flex flex-column align-items-center justify-content-center block-height" style={{ height: "31vh" }}>
          <img className="icon" src={sales} alt="" />
          <span className="heading">
            Daily 
          </span>
          <span className="number">12.645 <small>₺</small></span>
        <div className="w-100 pt-2">
          <span>
            <span className="" style={{ color: "#58DEAA", fontSize: "0.9rem" }}>
              %22
              <HiArrowSmUp
                className="arrow"
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
