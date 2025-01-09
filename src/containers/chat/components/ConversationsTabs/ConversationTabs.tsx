import React from "react";

import { motion as m } from "motion/react";
import PublicTab from "./PublicTab/PublicTab";
import FriendsTab from "./FriendsTab/FriendsTab";

type ConvoTab = {
  label: React.ReactNode;
  key: string;
  element: React.ReactNode;
};

const tabs: ConvoTab[] = [
  {
    label: "Friends",
    key: "friends",
    element: <FriendsTab />,
  },
  {
    label: "Groups",
    key: "groups",
    element: <div></div>,
  },
  {
    label: "Public",
    key: "public",
    element: <PublicTab />,
  },
];

const ConversationTabs = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <div className="w-80 shrink-0">
      <div className="flex justify-around items-center text-xl font-medium font-fun ">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab.key;
          return (
            <button
              onClick={() => {
                setActiveTab(tab);
              }}
              key={tab.key}
              className="relative"
            >
              <div>{tab.label}</div>
              {isActive && (
                <m.div
                  layout
                  layoutId="convo-tab-active"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gray-700 rounded-lg"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="p-2 mt-4">{activeTab.element}</div>
    </div>
  );
};

export default ConversationTabs;
