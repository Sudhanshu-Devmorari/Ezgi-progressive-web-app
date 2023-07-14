import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ContextProvider from "./context/Provider";
import EditorProfileActiveComments from "./components/EditorProfileActiveComments/EditorProfileActiveComments";

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

export default App;<div>DashboardSU</div>