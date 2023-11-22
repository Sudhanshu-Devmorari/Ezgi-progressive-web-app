import React from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import facebook from "../assets/FacebookLogo.png";
import axios from "axios";
import config from "../config";
import { useCookies } from "react-cookie";

const FacebookLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = (response) => {
    // console.log(response);
    const username = response.data.name.split(" ")[0].toLowerCase();
    // console.log(username);
    const formData = new FormData();
    formData.append("email", response.data.email);
    formData.append("name", response.data.name);
    formData.append("username", username);
    axios
      .post(`${config?.apiUrl}/facebook-login/`, formData)
      .then((response) => {
        // console.log(response.data, "====BE");
        // localStorage.setItem("user-role", response.data.userRole);
        // localStorage.setItem("user-id", response.data.userId);

        // setCookie("user-role", response.data.userRole, {
        //   expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        // });
        // setCookie("user-id", response.data.userId, {
        //   expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        // })
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
        <img
          onContextMenu={(e) => e.preventDefault()}
          className="mx-3"
          src={facebook}
          alt=""
          height={50}
        />
      </LoginSocialFacebook>
    </>
  );
};

export default FacebookLogin;
