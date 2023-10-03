import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import config from "../../config";

const WalletSelection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const pendingBalanceHistory = async () => {
    const userId = localStorage.getItem("user-id");
    try {
      const res = await axios.get(
        `${config?.apiUrl}/pending-balance/${userId}/`
      );
      if(res.status == 200){
        props.setPendingBalance(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } g-0 my-2 px-2 py-3 d-flex justify-content-between select-comment`}
      >
        {props.user === "commentator" && (
          <>
            <div
              style={{
                color:
                  props.walletSelection === "My transactions" ? "#D2DB08" : "",
              }}
              onClick={() => props.setWalletSelection("My transactions")}
            >
              My Transactions
            </div>
            <div
              style={{
                color:
                  props.walletSelection === "pending balance" ? "#D2DB08" : "",
              }}
              onClick={() => {props.setWalletSelection("pending balance"); pendingBalanceHistory()}}
            >
              Pending Balance
            </div>
            <div
              style={{
                color:
                  props.walletSelection === "account status" ? "#D2DB08" : "",
              }}
              onClick={() => props.setWalletSelection("account status")}
            >
              Account Status
            </div>
          </>
        )}

        {props.user === "standard user" && (
          <div
            style={{
              color: "#D2DB08",
            }}
          >
            My Transactions
          </div>
        )}
      </div>
    </>
  );
};

export default WalletSelection;
