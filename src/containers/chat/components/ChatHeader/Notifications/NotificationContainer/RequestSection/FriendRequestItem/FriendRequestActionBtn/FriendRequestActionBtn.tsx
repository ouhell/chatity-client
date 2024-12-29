import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useFriendRequestDelete from "@/hooks/api/mutations/useFriendRequestDelete";
import { FriendRequestResp } from "@/types/api/responses/friends";
import { Loader2 } from "lucide-react";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestActionBtn = ({ data }: Props) => {
  const user = useSession()!.sessionUser!;

  const isSender = user.id === data.sender.id;
  const isReceiver = user.id === data.receiver.id;

  const { mutateAsync: deleteRequest, isPending: isDeleting } =
    useFriendRequestDelete();
  return (
    <div className="flex gap-4 items-center">
      {isSender && (
        <button
          disabled={isDeleting}
          onClick={() => {
            if (isDeleting) return;
            deleteRequest({
              senderId: data.senderId,
              receiverId: data.receiverId,
            });
          }}
          className="flex gap-2 items-center bg-rose-700 text-white px-2 py-1 rounded text-center min-w-16"
        >
          <span>Cancel</span>
          {isDeleting && (
            <span>
              <Loader2 className="size-4 animate-spin" />
            </span>
          )}
        </button>
      )}
      {isReceiver && (
        <>
          <button className="bg-teal-700 text-white px-2 py-1 rounded text-center min-w-16">
            Accept
          </button>

          <button
            disabled={isDeleting}
            onClick={() => {
              if (isDeleting) return;
              deleteRequest({
                senderId: data.senderId,
                receiverId: data.receiverId,
              });
            }}
            className="flex gap-2 items-center bg-rose-700 text-white px-2 py-1 rounded text-center min-w-16"
          >
            <span>Cancel</span>
            {isDeleting && (
              <span>
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default FriendRequestActionBtn;