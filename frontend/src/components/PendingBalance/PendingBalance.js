import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";

const PendingBalance = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const pendingBalanceArray = [
    {
      name: "kingofking",
      count: "2-3",
      date: "22.04.2023",
      price: "79.90₺",
    },
    {
      name: "semiharkin",
      count: "3-3",
      date: "22.04.2023",
      price: "79.90₺",
    },
    {
      name: "jhondoe",
      count: "3-6",
      date: "22.04.2023",
      price: "79.90₺",
    },
    {
      name: "melih1905",
      count: "6-6",
      date: "22.04.2023",
      price: "79.90₺",
    },
  ];
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2`} style={{fontSize:"14px"}}
      >
        <div className="my-2" style={{borderBottom: currentTheme === "dark" ? "2px solid #E6E6E6" : "2px solid #0D2A53"}}>
          May 2023
          {pendingBalanceArray.map((pen, index) => (
            <div
              className="row g-0 my-2 p-2 d-flex justify-content-between"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              <div className="col">{pen.name}</div>
              <div className="col text-center">
                <span>{pen.count}</span>{" "}
                <span className="ps-2">{pen.date}</span>
              </div>
              <div className="col text-end">{pen.price}</div>
            </div>
          ))}
          <div className="text-end py-2">Total 3.650₺</div>
        </div>
        <div className="my-2">
          Jun 2023
          {pendingBalanceArray.map((pen, index) => (
            <div
              className="row g-0 my-2 p-2 d-flex justify-content-between"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              <div className="col">{pen.name}</div>
              <div className="col text-center">
                <span>{pen.count}</span>{" "}
                <span className="ps-2">{pen.date}</span>
              </div>
              <div className="col text-end">{pen.price}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PendingBalance;
