import { Bell } from "lucide-react";
import NotificationsContainer from "./NotificationContainer/NotificationsContainer";
import { atom, useAtom } from "jotai";
const notifOpenAtom = atom(false);
const Notifications = () => {
  const [open, setOpen] = useAtom(notifOpenAtom);

  return (
    <div className="relative  w-fit">
      <button
        onClick={() => {
          setOpen((old) => !old);
        }}
        className="px-2 py-1.5 rounded-full hover:bg-slate-100/40  transition-colors "
      >
        <Bell className="size-5" />
      </button>
      <NotificationsContainer open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Notifications;
