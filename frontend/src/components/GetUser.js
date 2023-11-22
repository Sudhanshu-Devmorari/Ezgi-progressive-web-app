
import { Cookies, useCookies } from "react-cookie";
// import { UserId } from "./UserId.js";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/selector";

// const id = UserId();
// console.log(id);
// export const userId = UserId();

// const cookies = new Cookies();
// console.log("user-id",typeof cookies.get("user-id"))
// console.log("user-id", cookies.get("user-id"))
// export const userId = cookies.get("user-id");

// This will export the userId at the time of the module import
export const UserId = () => {
  const userData = useSelector(selectUser);
  return userData.user.id;
};

// export const userId = UserId()

export function truncateString(str, maxLength) {
  if (str && str?.length <= maxLength) {
    return str;
  } else {
    // Subtract 3 from maxLength to make room for the ellipsis.
    return str?.substring(0, maxLength - 1) + "...";
  }
}
