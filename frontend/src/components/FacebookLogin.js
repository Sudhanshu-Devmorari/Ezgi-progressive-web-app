import React from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import facebook from "../assets/FacebookLogo.png";
import axios from "axios";

const FacebookLogin = () => {
  const login = (response) => {
    // console.log(response);
    const username = response.data.name.split(" ")[0].toLowerCase();
    console.log(username);
    const formData = new FormData();
    formData.append("email", response.data.email);
    formData.append("name", response.data.name);
    formData.append("username", username);
    axios
      .post("http://127.0.0.1:8000/facebook-login/", formData)
      .then((response) => {
        console.log(response.data, "====BE");
        localStorage.setItem("user-role", response.data.userRole);
        localStorage.setItem("user-id", response.data.userId);
        window.location.reload();
      })
      .catch((error) => {});
  };

  return (
    <>
      <LoginSocialFacebook
        appId="664494525615195"
        onResolve={(response) => {
          login(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <img className="mx-3" src={facebook} alt="" height={50} />
      </LoginSocialFacebook>
    </>
  );
};

export default FacebookLogin;
