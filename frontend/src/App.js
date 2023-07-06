import { Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import MainPage from "./components/MainPage/MainPage";
import ContextProvider from "./context/Provider";

function App() {
  return (
    <>
    <ContextProvider>
      <Routes>
        {/* <Route path="/" element={ <Index /> }  /> */}
        <Route path="/" element={ <MainPage /> }  />
      </Routes>
    </ContextProvider>
    </>
  );
}

export default App;