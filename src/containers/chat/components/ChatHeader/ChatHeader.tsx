import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useLogout from "@/hooks/api/mutations/useLogout";

const ChatHeader = () => {
  const session = useSession()!;
  const user = session.sessionUser!;
  const { mutateAsync: logout } = useLogout();
  return (
    <header className="flex justify-between items-center border-b border-gray-200 py-4 px-8   ">
      <div className="text-3xl font-bold font-fun">Chatity</div>
      <button
        onClick={() => {
          logout();
        }}
        className="flex gap-4 items-center"
      >
        <div
          title={user.username}
          className="text-lg max-w-24 overflow-hidden overflow-ellipsis whitespace-nowrap  text-slate-900 font-semibold"
        >
          {user.username}
        </div>
        <div className="size-10 bg-slate-200 rounded-full overflow-hidden  relative z-10">
          <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center capitalize  font-bold z-[-1] text-slate-600 ">
            {user.username[0]}
          </div>
          {user.picture_url && (
            <img
              className="size-full border-none outline-none z-10 rounded-full scale-105"
              src={user.picture_url}
              alt=""
            />
          )}
        </div>
      </button>
    </header>
  );
};

export default ChatHeader;
