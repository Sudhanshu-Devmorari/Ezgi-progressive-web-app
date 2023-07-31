import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import WithdrawalManagementPage from "./components/WithdrawalManagementPage/WithdrawalManagementPage";
import UserManagementPage from "./components/UserManagementPage/UserManagementPage";
import CommentsManagementPage from "./components/CommentsManagementPage/CommentsManagementPage";
import EditorManagementPage from "./components/EditorManagementPage/EditorManagementPage";
import SalesManagementPage from "./components/SalesManagementPage/SalesManagementPage";
import SupportManagementPage from "./components/SupportManagementPage/SupportManagementPage";
import SubUserManagementPage from "./components/SubUserManagementPage/SubUserManagementPage";
import NotificationManagementPage from "./components/NotificationManagementPage/NotificationManagementPage";
import AdsManagementPage from "./components/AdsManagementPage/AdsManagementPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import EditorSettingsPage from "./components/EditorSettingsPage/EditorSettingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="comments" element={<CommentsManagementPage />} />
        <Route path="editors" element={<EditorManagementPage />} />
        <Route path="withdrawal" element={<WithdrawalManagementPage />} />
        <Route path="sales" element={<SalesManagementPage />} />
        <Route path="support" element={<SupportManagementPage />} />
        <Route path="subuser" element={<SubUserManagementPage />} />
        <Route path="notification" element={<NotificationManagementPage />} />
        <Route path="ads" element={<AdsManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="editorSettings" element={<EditorSettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
