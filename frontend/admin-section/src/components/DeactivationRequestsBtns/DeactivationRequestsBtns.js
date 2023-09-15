import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

const DeactivationRequestsBtns = (props) => {
  const [time, setTime] = useState(false);

  const id = props?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);

  const handleDeactivation = async (action) => {
    try {
      if (action === "accept") {
        setIsLoadingAccept(true);
      } else {
        setIsLoading(true);
      }
      const res = await axios.post(
        `${config?.apiUrl}/deactivate-commentator/${id}/`,
        { status: action }
      );
      if (res.status === 200) {
        if (action === "accept") {
          setIsLoadingAccept(false);
        } else {
          setIsLoading(false);
        }
        props?.editorManagementApiData();
        Swal.fire({
          title: "Success",
          text:
            (action === "accept" &&
              "Deactivation request successfully approved.") ||
            (action === "reject" &&
              "Deactivation request successfully rejected."),
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="my-2">
        <button
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
        <button
          onClick={() => {
            if (id) {
              handleDeactivation("accept");
            }
          }}
          className="px-2 mx-3"
          style={{
            border: "1px solid #FFDD00",
            color: "#FFDD00",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          {isLoadingAccept ? "Loading..." : "Deactive"}
        </button>
        <button
          onClick={() => {
            if (id) {
              handleDeactivation("reject");
            }
          }}
          className="px-2"
          style={{
            border: "1px solid #FF5757",
            color: "#FF5757",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          {isLoading ? "Loading..." : "Reject"}
        </button>
      </div>
    </>
  );
};

export default DeactivationRequestsBtns;
