import ChatHeader from "./components/ChatHeader/ChatHeader";
import { Route, Routes } from "react-router-dom";
import ConversationsPage from "./pages/ConversationsPage";
import React from "react";
import { mainSocket } from "@/websocket/websocket";

const ChatContainer = () => {
  React.useEffect(() => {
    console.log("socket init", mainSocket.readyState);
  }, []);
  return (
    <div className=" h-screen flex flex-col ">
      <ChatHeader />
      <Routes>
        <Route path="/*" element={<ConversationsPage />} />
      </Routes>
    </div>
  );
};

export default ChatContainer;
