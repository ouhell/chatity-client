import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSession } from "./context/UserSessionContext/UserSessionContext";
import { lazy, Suspense } from "react";
const HomeContainer = lazy(() => import("./containers/home/HomeContainer"));
const ChatContainer = lazy(() => {
  return import("./containers/chat/ChatContainer");
});
function App() {
  const session = useSession();

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Suspense
            fallback={
              <div className=" fixed top-0 left-0 right-0 bottom-0 grid place-items-center text-2xl font-semibold">
                loading...
              </div>
            }
          >
            {session?.sessionUser ? <ChatContainer /> : <HomeContainer />}
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
