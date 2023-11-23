import { useSelector } from "react-redux";
import { selectUser } from "../Redux/selector";

// This will export the userId at the time of the module import
export const UserId = () => {
  const userData = useSelector(selectUser);
  return userData?.user?.id;
};