import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import { FriendRequestResp } from "@/types/api/responses/friends";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestActionBtn = ({ data }: Props) => {
  const user = useSession()!.sessionUser!;

  const isSender = user.id === data.sender.id;
  const isReceiver = user.id === data.receiver.id;
  return (
    <div className="flex gap-4 items-center">
      {isSender && (
        <button className="bg-rose-700 text-white px-2 py-1 rounded text-center min-w-16">
          Cancel
        </button>
      )}
      {isReceiver && (
        <>
          {isSender && (
            <button className="bg-teal-700 text-white px-2 py-1 rounded text-center min-w-16">
              Accept
            </button>
          )}
          {isSender && (
            <button className="bg-rose-700 text-white px-2 py-1 rounded text-center min-w-16">
              Refuse
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FriendRequestActionBtn;
