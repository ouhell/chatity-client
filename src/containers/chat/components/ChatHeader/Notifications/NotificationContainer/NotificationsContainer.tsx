import React from "react";
import { AnimatePresence, motion as m } from "motion/react";
import NotificationSection from "./NotificationSection/NotificationSection";
import RequestSection from "./RequestSection/RequestSection";

type Props = {
  open: boolean;
  onClose: () => void;
};
const NotificationsContainer = ({ open, onClose }: Props) => {
  const container = React.useRef<React.ElementRef<"div">>(null);
  const [notif, setNotif] = React.useState(false);
  React.useEffect(() => {
    const callBack = (e: MouseEvent) => {
      if (container.current && !container.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) {
      setTimeout(() => {
        window.addEventListener("click", callBack);
      }, 100);
    }

    return () => {
      window.removeEventListener("click", callBack);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={container}
          initial={{
            opacity: 0,
            //   scale: 0.7,
            y: -20,
            //   scale: 1.2,
            translateX: "50%",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            scale: 0,
            opacity: 0,
            y: -500,
            transition: {
              duration: 0.3,
            },
          }}
          className="flex flex-col absolute bottom-0 top-full right-1/2  w-[25rem] h-[35rem] bg-white z-20 rounded shadow border p-4"
        >
          <div className="flex gap-4 justify-center items-center border p-2 rounded font-fun text-lg">
            <button
              onClick={() => {
                setNotif(true);
              }}
              className="min-w-fit w-full px-2 py-1 rounded text-center relative z-1"
            >
              <span>Notifications</span>
              {notif && (
                <m.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-slate-200 z-[-1] rounded"
                  layout
                  layoutId="active notif tab"
                ></m.div>
              )}
            </button>
            <button
              onClick={() => {
                setNotif(false);
              }}
              className="min-w-fit w-full px-2 py-1 rounded text-center relative z-1 "
            >
              <span>Requests</span>
              {!notif && (
                <m.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-slate-200 z-[-1] rounded"
                  layout
                  layoutId="active notif tab"
                ></m.div>
              )}
            </button>
          </div>
          <div className="h-full overflow-x-auto pt-4">
            {notif && <NotificationSection />}
            {!notif && <RequestSection />}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsContainer;
