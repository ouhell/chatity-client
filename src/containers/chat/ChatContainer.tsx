import React from "react";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import ConversationsPage from "./pages/ConversationsPage";

const ChatContainer = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div className="min-h-screen flex flex-col ">
      <ChatHeader />
      <Routes>
        <Route path="/*" element={<ConversationsPage />} />
      </Routes>
    </div>
  );
};

export default ChatContainer;
