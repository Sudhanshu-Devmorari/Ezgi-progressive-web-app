import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import WithdrawalManagementPage from "./components/WithdrawalManagementPage/WithdrawalManagementPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="withdrawal" element={<WithdrawalManagementPage />} />
      </Routes>
    </>
  );
}

export default App;
