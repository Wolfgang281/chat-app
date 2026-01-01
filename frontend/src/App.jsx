import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/auth" />} />
        //! Redirect unknown routes to /auth
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//~ use lazy suspense for loading only the components when needed example when user navigates to /chat only then load chat component
