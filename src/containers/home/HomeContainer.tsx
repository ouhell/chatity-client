import HomeHeader from "./components/HomeHeader/HomeHeader";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import OauthConfirmPage from "./pages/OauthConfirmPage";
import { AnimatePresence } from "motion/react";

const HomeContainer = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="bg-slate-50 flex-1">
        <HomeHeader />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/auth/confirm" element={<OauthConfirmPage />} />
          </Routes>
        </AnimatePresence>
      </div>

      <HomeFooter />
    </div>
  );
};

export default HomeContainer;
