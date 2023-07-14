import React, { useContext } from 'react'
import CurrentTheme from '../../context/CurrentTheme';

const NotificationsAndSupportSelection = (props) => {
    const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
     <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex my-2 px-2 py-3 gap-3`} style={{fontSize:"15px"}}
      >
        {props.content === "notifications" && 
            <div style={{color: "#D2DB08"}}>Notifications</div>
        }
        {props.content === "support" && 
            <div style={{color: "#D2DB08"}}>Support</div>
        }

      </div>
    </>
  )
}

export default NotificationsAndSupportSelection