import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import LoginModal from "./components/LoginModal/LoginModal";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const isAuthenticated = cookies["admin-user-id"]
  const navigate = useNavigate()
  useEffect(() => {
    // Update the cookie when the route changes
    if (isAuthenticated) {
      setCookie("admin-user-id", isAuthenticated, {
        expires: new Date(new Date().getTime() + 7200000),
      });
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
    
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LoginModal />} />
        ) : (
          <>
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
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
