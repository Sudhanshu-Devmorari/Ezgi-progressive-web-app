import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";

const TransactionArray = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const transactionsHistory = [
    {
      name: "New Subscriber",
      days: "1 Month",
      date: "22.04.2023 - 16:38",
      total: "100.00₺",
    },
    {
      name: "New Subscriber",
      days: "6 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
    {
      name: "Highlight",
      days: "2 Week",
      date: "22.04.2023 - 16:38",
      total: "245.00₺",
    },
    {
      name: "New Subscriber",
      days: "1 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
    {
      name: "New Subscriber",
      days: "6 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
  ];
  return (
    <>
      {transactionsHistory.map((tran, index) => (
        <div
          className="my-2 p-2 row g-0"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "12px",
          }}
        >
          <div className="col-4">{tran.name}</div>
          <div className="col-2">{tran.days}</div>
          <div className="col-4">{tran.date}</div>
          <div
            className="col-2 text-end"
            style={{
              color:
                currentTheme === "dark"
                  ? tran.name === "Highlight"
                    ? "#FF5757"
                    : "#37FF80"
                  : tran.name === "Highlight"
                  ? "#FF5757"
                  : "#00DE51",
            }}
          >
            {tran.total}
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionArray;
