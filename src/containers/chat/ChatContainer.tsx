import ChatHeader from "./components/ChatHeader/ChatHeader";
import { Route, Routes } from "react-router-dom";
import ConversationsPage from "./pages/ConversationsPage";

const ChatContainer = () => {
  return (
    <div className="min-h-screen h-screen max-h-screen flex flex-col bg-yellow-50 ">
      <ChatHeader />
      <Routes>
        <Route path="/*" element={<ConversationsPage />} />
      </Routes>
    </div>
  );
};

export default ChatContainer;
