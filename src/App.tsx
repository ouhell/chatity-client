import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/home/HomeContainer";
import ChatContainer from "./containers/chat/ChatContainer";
import { useSession } from "./context/UserSessionContext/UserSessionContext";
function App() {
  const session = useSession();

  return (
    <Routes>
      <Route
        path="/*"
        element={session?.sessionUser ? <ChatContainer /> : <HomeContainer />}
      />
    </Routes>
  );
}

export default App;
