import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./TransactionArray.css";
import axios from "axios";
import { UserId } from "../GetUser";
import config from "../../config";

const TransactionArray = (props) => {
  const userId = UserId()
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
        (props.transactionHistory?.length == 0 ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            No Record Found!
          </div>
        ) : (
          props.transactionHistory.map((tran, index) => (
            <div
              className="my-2 p-2 row g-0"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                fontSize: "12px",
              }}
            >
              <div className="col-4">{tran.type}</div>
              <div
                className="col-2 text-capitalize"
                style={{
                  color:
                    (tran.duration === "reject" && "#FF5757") ||
                    (tran.duration === "approve" && "#37FF80") ||
                    (tran.duration === "pending" && "rgb(255, 204, 0)"),
                }}
              >
                {tran.duration}
              </div>
              <div className="col-4">{tran.date}</div>
              <div
                className="col-2 text-end"
                style={{
                  color:
                    currentTheme === "dark"
                      ? // ? (tran.type === "Highlight" || tran.type === "New Subscription")
                        //   ? "#FF5757"
                        //   : "#37FF80"
                        // : (tran.type === "Highlight" || tran.type === "New Subscription")
                        tran.type === "Highlight" ||
                        tran.type === "Become Editor" ||
                        tran.type === "New Subscription"
                        ? "#FF5757"
                        : "#37FF80"
                      : tran.type === "Highlight" ||
                        tran.type === "Become Editor" ||
                        tran.type === "New Subscription"
                      ? "#FF5757"
                      : "#00DE51",
                }}
              >
                {tran.amount}₺
              </div>
            </div>
          ))
        ))}

      {props.user === "standard user" &&
        (props.transactionHistory?.length == 0 ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            No Record Found!
          </div>
        ) : (
          props.transactionHistory.map((tran) => (
            <div
              className="my-2 p-2 row g-0 fonts-transactions"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                fontSize: "12px",
              }}
            >
              <div
                className="col-4"
                style={{
                  color:
                    currentTheme === "dark"
                      ? tran.type === "New Subscription"
                        ? "#37FF80"
                        : tran.type === "Renew Subscription"
                        ? "#4DD5FF"
                        : ""
                      : tran.type === "New Subscription"
                      ? "#00DE51"
                      : tran.type === "Renew Subscription"
                      ? "#00659D"
                      : "",
                }}
              >
                {tran.type}
              </div>
              <div
                className="col-2"
                style={{
                  color:
                    (tran.duration === "reject" && "#FF5757") ||
                    (tran.duration === "approve" && "#37FF80") ||
                    (tran.duration === "pending" && "rgb(255, 204, 0)"),
                }}
              >
                {tran.duration}
              </div>
              <div className="col-4">{tran.date}</div>
              <div
                className="col-2 text-end"
                style={{
                  color:
                    currentTheme === "dark"
                      ? // ? (tran.type === "Highlight" || tran.type === "New Subscription")
                        //   ? "#FF5757"
                        //   : "#37FF80"
                        // : (tran.type === "Highlight" || tran.type === "New Subscription")
                        tran.type === "Highlight" ||
                        tran.type === "Become Editor" ||
                        tran.type === "New Subscription"
                        ? "#FF5757"
                        : "#37FF80"
                      : tran.type === "Highlight" ||
                        tran.type === "Become Editor" ||
                        tran.type === "New Subscription"
                      ? "#FF5757"
                      : "#00DE51",
                }}
              >
                {tran.amount}₺
              </div>
            </div>
          ))
        ))}
    </>
  );
};

export default TransactionArray;
