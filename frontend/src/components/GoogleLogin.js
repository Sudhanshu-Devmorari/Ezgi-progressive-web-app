import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "../assets/googleLogo.png";
import config from "../config";
import { useCookies } from "react-cookie";

const GoogleLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [user, setUser] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log("User Login Success =================", codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res.data, "==================res.data");
          try {
            const username = res.data.name.split(" ")[0].toLowerCase();
            // console.log(username);
            const formData = new FormData();
            formData.append("email", res.data.email);
            formData.append("name", res.data.name);
            formData.append("username", username);
            return axios.post(`${config?.apiUrl}/google-login/`, formData);
          } catch (e) {
            throw e;
          }
        })
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem("user-role", response.data.userRole);
          localStorage.setItem("user-id", response.data.userId);

          setCookie("user-role", response.data.userRole, {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          });
          setCookie("user-id", response.data.userId, {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          })

          window.location.reload();
        })
        .catch((error) => {});
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
  };
  return (
    <>
      <img
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => login()}
        className="mx-3"
        src={google}
        alt=""
        height={50}
      />
    </>
  );
};

export default GoogleLogin;
