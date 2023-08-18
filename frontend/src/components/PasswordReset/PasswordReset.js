import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import Swal from "sweetalert2";

const PasswordReset = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // PASSWORD RESET API
  const handlePasswordReset = async () => {
    if (password !== "") {
      const res = await axios.post("http://127.0.0.1:8000/password-reset/", {
        new_ps: password,
        phone: props.forgotPsPhone,
      });
      console.log("res password reset ", res.data);
      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.data,
          icon: "success",
          backdrop: false,
          customClass: `${
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert"
          }`,
        }).then((result) => {
          if (result.isConfirmed) {
            props.hide();
          }
        });
      }
    } else {
      setPasswordError("Please enter a valid password.");
    }
  };

  return (
    <>
      <div className="">
        <div className="m-3 mt-4">
          <div className="d-flex justify-content-center">
            <span>
              <RxCross2
                onClick={props.hide}
                fontSize={"1.8rem"}
                className={`${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
              />
            </span>
          </div>
          <div className="">You can create your new password</div>
          <div className="">
            <div className="d-flex flex-column my-2">
              <label htmlFor="Password">New Password</label>
              <input
                className={`${
                  currentTheme === "dark" ? "darkMode-input" : "lightMode-input"
                } form-control`}
                type={showPassword ? "text" : "password"}
                name=""
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "6rem",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "6rem",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <small className="text-danger" style={{ fontSize: "0.71rem" }}>
              {passwordError}
            </small>
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
              onClick={() => {
                handlePasswordReset();
              }}
              className={`${
                currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
              } px-3 py-1`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
