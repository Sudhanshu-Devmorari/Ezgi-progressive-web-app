import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ContextProvider from "./context/Provider";
import './App.css'

function App() {
  return (
    <>
    <ContextProvider>
      <Routes>
        <Route path="/" element={ <MainPage /> }  />
      </Routes>
    </ContextProvider>
    </>
  );
}

export default App;