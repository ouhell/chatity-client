import { motion as m } from "motion/react";
import { Route, Routes } from "react-router-dom";
import PrivateConversation from "./PrivateConversation/PrivateConversation";
const message = "Enter a conversation and start chatting!";

const Conversations = () => {
  return (
    <Routes>
      <Route
        path="/conversations/private/:conversationId"
        element={<PrivateConversation />}
      />
      <Route
        path="*"
        element={
          <div className="grid place-items-center flex-1">
            <div className="flex flex-col gap-8 items-center opacity-80">
              <m.img
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.2,
                    ease: "easeInOut",
                  },
                }}
                className="max-w-40"
                src="/images/speech_bubble.png"
                alt=""
              />
              <m.div className="font-fun text-5xl opacity-70">
                {message.split("").map((letter, i) => {
                  return (
                    <m.span
                      initial={{
                        opacity: 0.7,

                        display: "none",
                      }}
                      animate={{
                        opacity: 1,
                        display: "inline",
                        transition: {
                          delay: i * 0.08,
                          // display: {
                          //   duration: 0,
                          // },
                        },
                      }}
                      key={letter + "/" + i}
                    >
                      {letter}
                    </m.span>
                  );
                })}
                <m.span
                  layout
                  layoutId="animated-text-cursor"
                  className="font-mono animate-pulse text-[1.3em]"
                >
                  |
                </m.span>
              </m.div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Conversations;
