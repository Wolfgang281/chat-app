import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../utils/constants";
import apiClient from "./lib/axios";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  if (userInfo === undefined) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!userInfo;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  if (userInfo === undefined) {
    return <div>Loading...</div>;
  }
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(AUTH_ROUTES.USER_INFO);

        if (response?.data?.success) {
          setUserInfo(response?.data?.user);
        }

        setLoading(false);
      } catch (error) {
        setUserInfo(null);
        toast.error(error.response?.data?.message);
        setLoading(false);
      }
    };
    if (!userInfo) fetchUserInfo();
  }, [userInfo, setUserInfo]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
        //! Redirect unknown routes to /auth
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//~ use lazy suspense for loading only the components when needed example when user navigates to /chat only then load chat component
