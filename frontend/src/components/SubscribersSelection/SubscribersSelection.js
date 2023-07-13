import React, { useContext } from 'react'
import CurrentTheme from '../../context/CurrentTheme';

export const SubscribersSelection = (props) => {
    const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
    
  return (
    <>
    <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex my-2 px-2 py-3 gap-3`} style={{fontSize:"15px"}}
      >
        <div style={{color: props.subscribersOrSubscriptions === "My subscribers" ? "#D2DB08" : ""}} onClick={()=>props.setSubscribersOrSubscriptions("My subscribers")}>My Subscribers</div>
        <div style={{color: props.subscribersOrSubscriptions === "My subscriptions" ? "#D2DB08" : ""}} onClick={()=>props.setSubscribersOrSubscriptions("My subscriptions")}>My Subscriptions</div>
      </div>
    </>
  )
}
