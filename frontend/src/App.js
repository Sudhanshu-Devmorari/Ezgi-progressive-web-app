import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ContextProvider from "./context/Provider";
import { Provider, useDispatch, useSelector} from "react-redux";
import './App.css'
import { useEffect, useState } from "react";
import { selectUser } from "./Redux/selector";
import { setUserDetails } from "./Redux/user";
import AxiosInstance from "./components/AxiosInstance";
import config from "./config";
import store from "./Redux/store";
import { Cookies } from "react-cookie";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(true);

  const cookies = new Cookies();
  const token = cookies.get("access-token");

  useEffect(() => {
    (async () => {
      if(token){
        try {
          const response = await AxiosInstance.get(`${config.apiUrl}/retrieve-user-using-token/`);
          dispatch(setUserDetails(response.data));
          setUserData(false)
        } catch (error) {
          setUserData(false)
          console.log("Somehting went wrong!")
          // error handling logic
        }
      }
      else{
        setUserData(false)
      }
    })()
  }, [])
  return (
    <>
    <ContextProvider>
      <Routes>
      {userData == false ?
        <Route path="/" element={ <MainPage /> }  />
        : null
      }
      </Routes>
    </ContextProvider>
    </>
  );
}

export default App;