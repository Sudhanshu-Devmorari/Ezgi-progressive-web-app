import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import './TransactionArray.css'
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";

const TransactionArray = (props) => {
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
  const transactions = [
    {
      name: "New Subscription",
      days: "1 Month",
      date: "22.04.2023 - 16:38",
      total: "100.00₺",
    },
    {
      name: "New Subscription",
      days: "1 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
    {
      name: "Renew Subscription",
      days: "6 Month",
      date: "22.04.2023 - 16:38",
      total: "245.00₺",
    },
    {
      name: "New Subscription",
      days: "1 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
    {
      name: "Renew Subscription",
      days: "6 Month",
      date: "22.04.2023 - 16:38",
      total: "485.00₺",
    },
  ];
    // // Subscription API
    // const [transactionsData, setTransactionsData] = useState([]);
    // useEffect(() => {
    //   async function getSubscriptions(){
    //     const res = await axios.get(`${config?.apiUrl}/retrieve-subscribers-subscription/${userId}`)
    //     console.log("resL ",res.data);
    //   }
    //   getSubscriptions();
    // }, [])
  return (
    <>
      {props.user !== "standard user" &&
        transactionsHistory.map((tran, index) => (
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

      {props.user === "standard user" &&
        transactions.map((tran) => (
          <div
            className="my-2 p-2 row g-0 fonts-transactions"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              fontSize: "12px",
            }}
          >
            <div
              className="col-4"
              style={{
                color:
                  currentTheme === "dark"
                    ? tran.name === "New Subscription"
                      ? "#37FF80"
                      : tran.name === "Renew Subscription"
                      ? "#4DD5FF"
                      : ""
                    : tran.name === "New Subscription"
                    ? "#00DE51"
                    : tran.name === "Renew Subscription"
                    ? "#00659D"
                    : "",
              }}
            >
              {tran.name}
            </div>
            <div className="col-2">{tran.days}</div>
            <div className="col-4">{tran.date}</div>
            <div className="col-2 text-end">{tran.total}</div>
          </div>
        ))}
    </>
  );
};

export default TransactionArray;
