import ChatHeader from "./components/ChatHeader/ChatHeader";
import { Route, Routes } from "react-router-dom";
import ConversationsPage from "./pages/ConversationsPage";

const ChatContainer = () => {
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
