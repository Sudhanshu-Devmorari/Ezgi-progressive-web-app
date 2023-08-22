import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ContextProvider from "./context/Provider";
import Chart from "./components/Chart/Chart";

function App() {
  return (
    <>
    <ContextProvider>
      <Routes>
        <Route path="/" element={ <MainPage /> }  />
        <Route path="chart" element={ <Chart /> }  />
      </Routes>
    </ContextProvider>
    </>
  );
}

export default App;