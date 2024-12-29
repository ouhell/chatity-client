import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useFriendRequestDelete from "@/hooks/api/mutations/useFriendRequestDelete";
import { FriendRequestResp } from "@/types/api/responses/friends";
import { Loader2 } from "lucide-react";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestHandler = ({ data: request }: Props) => {
  const user = useSession()!.sessionUser!;

  const isSender = user.id === request.senderId;
  const isReceiver = user.id === request.receiverId;

  const { mutateAsync: deleteRequest, isPending: isDeleting } =
    useFriendRequestDelete();
  return (
    <div className="flex gap-4">
      {isSender && (
        <button
          onClick={() => {
            if (isDeleting) return;
            deleteRequest({
              senderId: request.senderId,
              receiverId: request.receiverId,
            });
          }}
          className="flex gap-2 items-center px-2 py-1 rounded bg-rose-700 text-white hover:bg-rose-800 transition-colors opacity-90"
        >
          <span>Cancel Request</span>
          {isDeleting && (
            <span>
              <Loader2 className="animate-spin size-4" />
            </span>
          )}
        </button>
      )}
      {isReceiver && (
        <>
          <button className="px-2 py-1 rounded bg-teal-700 text-white hover:bg-teal-800 transition-colors opacity-90">
            Accept
          </button>
          <button
            onClick={() => {
              if (isDeleting) return;
              deleteRequest({
                senderId: request.senderId,
                receiverId: request.receiverId,
              });
            }}
            className="flex gap-2 items-center px-2 py-1 rounded bg-rose-700 text-white hover:bg-rose-800 transition-colors opacity-90"
          >
            <span>Cancel</span>
            {isDeleting && (
              <span>
                <Loader2 className="animate-spin size-4" />
              </span>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default FriendRequestHandler;
