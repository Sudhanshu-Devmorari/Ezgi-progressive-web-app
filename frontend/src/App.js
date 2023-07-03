import { Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={ <Index /> }  /> */}
        <Route path="/" element={ <MainPage /> }  />
      </Routes>
    </>
  );
}

export default App;