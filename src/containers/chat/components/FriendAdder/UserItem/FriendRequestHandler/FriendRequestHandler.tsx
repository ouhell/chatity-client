import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import { FriendRequestResp } from "@/types/api/responses/friends";
import React from "react";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestHandler = ({ data: request }: Props) => {
  const user = useSession()!.sessionUser!;

  const isSender = user.id === request.senderId;
  const isReceiver = user.id === request.receiverId;
  return (
    <div className="flex gap-4">
      {isSender && (
        <button className="px-2 py-1 rounded bg-rose-700 text-white hover:bg-rose-800 transition-colors opacity-90">
          Cancel Request
        </button>
      )}
      {isReceiver && (
        <>
          <button className="px-2 py-1 rounded bg-teal-700 text-white hover:bg-teal-800 transition-colors opacity-90">
            Accept
          </button>
          <button className="px-2 py-1 rounded bg-rose-700 text-white hover:bg-rose-800 transition-colors opacity-90">
            Refuse
          </button>
        </>
      )}
    </div>
  );
};

export default FriendRequestHandler;
