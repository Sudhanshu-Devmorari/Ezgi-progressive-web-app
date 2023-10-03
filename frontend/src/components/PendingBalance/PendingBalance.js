import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";

const PendingBalance = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  // console.log("pendingBalance", props.pendingBalance);
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
        } my-2 p-2`}
        style={{ fontSize: "14px" }}
      >
        {/* May 2023 */}
        {props.pendingBalance?.length == 0 ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            No Record Found!
          </div>
        ) : (
          props.pendingBalance.map((pen, index) => (
            <>
              <div
                className="my-2"
                style={{
                  borderBottom:
                    currentTheme === "dark"
                      ? "2px solid #E6E6E6"
                      : "2px solid #0D2A53",
                }}
              >
                <div>{pen.month_year}</div>
                {pen.data.map((data, index) => (
                  <div
                    className="row g-0 my-2 p-2 d-flex justify-content-between"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    <div className="col">{data.user}</div>
                    <div className="col text-center">
                      <span>{data.duration}</span>{" "}
                      <span className="ps-2">{data.date}</span>
                    </div>
                    <div className="col text-end">{data.amount}</div>
                  </div>
                ))}
                <div className="text-end py-2">Total {pen.total_amount}₺</div>
              </div>
            </>
          ))
        )}
        {/* <div className="my-2">
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
        </div> */}
      </div>
    </>
  );
};

export default PendingBalance;
