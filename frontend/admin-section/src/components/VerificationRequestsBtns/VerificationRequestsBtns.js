import axios from "axios";
import React, { useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";

const VerificationRequestsBtns = (props) => {
  const id = props?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingApprove, setIsLoadingApprove] = useState(false);

  const handleApproveOrReject = async (action) => {
    if (props?.from === "withdrawal") {
      try {
        if (action === "approve") {
          setIsLoadingApprove(true);
        } else {
          setIsLoading(true);
        }
        const adminId = localStorage.getItem('admin-user-id')
        const res = await axios.post(`${config.apiUrl}/bank-details/${adminId}/`, {
          id: id,
          status: action,
        });
        // console.log(res,"=========>>res")
        if (res.status === 200) {
          if (action === "approve") {
            setIsLoadingApprove(false);
          } else {
            setIsLoading(false);
          }
          props?.getWithdrawData();
          Swal.fire({
            title: "Success",
            text:
              (action === "approve" && "Request successfully approved.") ||
              (action === "reject" && "Request successfully rejected."),
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (action === "approve") {
          setIsLoadingApprove(true);
        } else {
          setIsLoading(true);
        }
        const res = await axios.post(`${config.apiUrl}/verify-user/${id}/`, {
          status: action,
        });
        if (res.status === 200) {
          if (action === "approve") {
            setIsLoadingApprove(false);
          } else {
            setIsLoading(false);
          }
          props?.editorManagementApiData();
          const confirm = await Swal.fire({
            title: "Success",
            text:
              (action === "approve" && "Request successfully approved.") ||
              (action === "reject" && "Request successfully rejected."),
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          if (confirm.value === true) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
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
              handleApproveOrReject("approve");
            }
          }}
          className="px-2 mx-3"
          style={{
            border: "1px solid #58DEAA",
            color: "#58DEAA",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          {isLoadingApprove ? "Loading..." : "Approve"}
        </button>
        <button
          onClick={() => {
            if (id) {
              handleApproveOrReject("reject");
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
          {isLoading ? "Loading" : "Reject"}
        </button>
      </div>
    </>
  );
};

export default VerificationRequestsBtns;
