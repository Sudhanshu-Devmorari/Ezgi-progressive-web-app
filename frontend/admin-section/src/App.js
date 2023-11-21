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
  const [commentData, setCommentData] = useState(false);
  const [withdrawableData, setWithdrawableData] = useState(false);

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
    else {
      removeCookie("access-token")
      navigate('/')
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
    
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LoginModal />} />
        ) : (
          <>
            <Route path="/" element={<MainPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="/users" element={<UserManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="comments" element={<CommentsManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData} commentData={commentData}/>} />
            <Route path="editors" element={<EditorManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="withdrawal" element={<WithdrawalManagementPage setWithdrawableData={setWithdrawableData} withdrawableData={withdrawableData} setCommentData={setCommentData}/>} />
            <Route path="sales" element={<SalesManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="support" element={<SupportManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="subuser" element={<SubUserManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="notification" element={<NotificationManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="ads" element={<AdsManagementPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="settings" element={<SettingsPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
            <Route path="editorSettings" element={<EditorSettingsPage setWithdrawableData={setWithdrawableData} setCommentData={setCommentData}/>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
