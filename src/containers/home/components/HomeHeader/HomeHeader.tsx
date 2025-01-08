import { Link, useLocation } from "react-router-dom";
import { motion as m } from "motion/react";
const routes = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/contacts",
    label: "Contact",
  },
  { to: "/about", label: "About" },
];

const HomeHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <header className="border-b  bg-white p-4 min-h-20 select-none font-fun">
      <div className="flex items-center justify-between gap-2 container mx-auto">
        <div className="text-3xl font-bold flex gap-3 items-center">
          <img
            src={"/favicond.svg"}
            alt="chatity icon"
            className="w-8 text-xs font-serif"
          />
          <span>Chatity</span>
        </div>
        <nav className="flex gap-8">
          <ul className="flex gap-8 items-center text-xl">
            {routes.map((route) => {
              const isActive = route.to === pathname;
              return (
                <li key={route.to} className="relative">
                  <Link to={route.to}>{route.label}</Link>
                  {isActive && (
                    <m.div
                      layoutId="navigation-active-line"
                      layout
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900"
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <Link to={"/signin"}>
            <button className="hover:bg-gray-900  hover:text-white border border-gray-900 px-4 py-1 rounded transition-colors text-xl">
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
