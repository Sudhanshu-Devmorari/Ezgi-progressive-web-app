import React, { useContext } from 'react'
import CurrentTheme from '../../context/CurrentTheme';

const WalletSelection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
    <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } g-0 my-2 px-2 py-3 d-flex justify-content-between select-comment`}
      >
        <div style={{color: props.walletSelection === "My transactions" ? "#D2DB08" : ""}} onClick={()=>props.setWalletSelection("My transactions")}>My Transactions</div>
        <div style={{color: props.walletSelection === "pending balance" ? "#D2DB08" : ""}} onClick={()=>props.setWalletSelection("pending balance")}>Pending Balance</div>
        <div style={{color: props.walletSelection === "account status" ? "#D2DB08" : ""}} onClick={()=>props.setWalletSelection("account status")}>Account Status</div>
      </div>
    </>
  )
}

export default WalletSelection