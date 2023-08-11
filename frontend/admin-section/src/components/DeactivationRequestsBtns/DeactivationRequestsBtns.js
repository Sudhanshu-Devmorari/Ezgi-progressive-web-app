import React, { useState,useEffect } from "react";
import axios from "axios";


const DeactivationRequestsBtns = (props) => {

  const [time , setTime] = useState(false);
  const handleDeactivation = async (status) => {
    console.log("::::::::::::;>>>>>>",props.id, "^^^^", status)
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/user-management/${props.id}/`,
        {
          deactivate_commentator:status
        }
      )
      props.editorManagementApiData();

      
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  // useEffect(() => {
  //   if(time){
      
  //   }
  // }, [time])
  
  
  return (
    <>
      <div className="my-2">
        <button onClick={() => {handleDeactivation('pending')}}
          className="px-2"
          style={{
            border: "1px solid #4DD5FF",
            color: "#4DD5FF",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          In Progress
        </button>
        <button onClick={() => {handleDeactivation('accept')}}
          className="px-2 mx-3"
          style={{
            border: "1px solid #FFDD00",
            color: "#FFDD00",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Deactive
        </button>
        <button onClick={() => {handleDeactivation('reject')}}
          className="px-2"
          style={{
            border: "1px solid #FF5757",
            color: "#FF5757",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Reject
        </button>
      </div>
    </>
  );
};

export default DeactivationRequestsBtns;
