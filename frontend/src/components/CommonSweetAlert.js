import React, { useContext } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrentTheme from "../context/CurrentTheme";

const CommonSweetAlert = ({ type, title, onConfirm, data }) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
//   const isError = error === "error";
  return (
    <SweetAlert
      customClass={`${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
      style={{
        backgroundColor: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
      }}
      btnSize="sm"
      //   error={isError} // Use the actual value of the isError variable
      //   success={!isError} // Show success icon when not an error
      type={type} // Use the type prop for specifying success or error
      title={title}
      onConfirm={() => {
        if (onConfirm) {
          onConfirm();
        }
      }}
    >
      {data}
    </SweetAlert>
  );
};

export default CommonSweetAlert;

// import React from 'react'
// import Swal from 'sweetalert2'

// export const Swal = require('sweetalert2');

// rgb(92, 184, 92)