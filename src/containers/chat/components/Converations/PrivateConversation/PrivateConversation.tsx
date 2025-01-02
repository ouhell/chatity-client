import React from "react";
import { useParams } from "react-router-dom";
import PrivateConvoHeader from "./PrivateConvoHeader/PrivateConvoHeader";
import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import PrivateConvoInputs from "./PrivateConvoInputs/PrivateConvoInputs";
import useMessagePost from "@/hooks/api/mutations/useMessagePost";

const PrivateConversation = () => {
  const user = useSession()!.sessionUser!;
  const { conversationId } = useParams();
  const {
    data: friends,
    isLoading: isLoadingFriends,
    // isError: isErrorFriends,
  } = useGetFriends();

  const friendship = React.useMemo(
    () => friends?.find((fr) => fr.conversationId === conversationId),
    [friends, conversationId]
  );

  const friend = React.useMemo(() => {
    if (!friendship) return;
    return user.id === friendship.friendA.id
      ? friendship.friendB
      : friendship.friendA;
  }, [friendship, user]);

  const { mutateAsync: sendMessage, isPending } = useMessagePost();

  return (
    <div className="flex-1 ">
      {!!friend && !!friendship && (
        <div className="flex flex-col justify-between h-full ">
          <PrivateConvoHeader friend={friend} friendship={friendship} />
          <div className="h-full grid place-items-center">
            {isPending ? <span>Loading....</span> : <span>Empty</span>}
          </div>
          <PrivateConvoInputs
            onSendMsg={(content) => {
              if (!conversationId || !friendship) return;
              sendMessage({
                message: {
                  conversationId: conversationId,
                  content: content,
                },
                params: {
                  friendShipId: {
                    friendAId: friendship.friendAId,
                    friendBId: friendship.friendBId,
                  },
                },
              })
                .then((res) => {
                  console.log("message sent", res);

                  return res;
                })
                .catch((err) => {
                  console.log("error when sending message", err);
                });
            }}
          />
        </div>
      )}

      {isLoadingFriends && (
        <div className="flex-1 grid place-items-center">
          <div className="text-5xl font-fun">Loading....</div>
        </div>
      )}
    </div>
  );
};

export default PrivateConversation;
