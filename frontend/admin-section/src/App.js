import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import WithdrawalManagementPage from "./components/WithdrawalManagementPage/WithdrawalManagementPage";
import UserManagementPage from "./components/UserManagementPage/UserManagementPage";
import CommentsManagementPage from "./components/CommentsManagementPage/CommentsManagementPage";
import EditorManagementPage from "./components/EditorManagementPage/EditorManagementPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="comments" element={<CommentsManagementPage />} />
        <Route path="editors" element={<EditorManagementPage />} />
        <Route path="withdrawal" element={<WithdrawalManagementPage />} />
      </Routes>
    </>
  );
}

export default App;
