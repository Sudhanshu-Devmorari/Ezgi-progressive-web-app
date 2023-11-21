
import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();
// console.log("user-id",typeof cookies.get("user-id"))
// console.log("user-id", cookies.get("user-id"))
export const userId = cookies.get("user-id");

export function truncateString(str, maxLength) {
  if (str && str?.length <= maxLength) {
    return str;
  } else {
    // Subtract 3 from maxLength to make room for the ellipsis.
    return str?.substring(0, maxLength - 1) + "...";
  }
}
