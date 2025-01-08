import React from "react";
import { useParams } from "react-router-dom";
import PrivateConvoHeader from "./PrivateConvoHeader/PrivateConvoHeader";
import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import PrivateConvoInputs from "./PrivateConvoInputs/PrivateConvoInputs";
import useMessagePost from "@/hooks/api/mutations/useMessagePost";
import PrivateConversationMessages from "./PrivateConversationMessages/PrivateConversationMessages";

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

  const { mutateAsync: sendMessage } = useMessagePost();

  return (
    <div className="h-full w-full overflow-hidden flex flex-col  ">
      {!!friend && !!friendship && (
        <div className="flex flex-col justify-between h-full  overflow-hidden  ">
          <PrivateConvoHeader
            friend={friend}
            friendship={friendship}
            key={conversationId + "/header"}
          />

          <PrivateConversationMessages
            friendship={friendship}
            conversationId={conversationId!}
            key={conversationId + "/messages"}
          />

          <PrivateConvoInputs
            onSendMsg={(content) => {
              if (!conversationId || !friendship) return;
              sendMessage({
                message: {
                  conversationId: conversationId,
                  content: content,
                },
                params: {
                  friendshipId: {
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
            key={conversationId + "/inputs"}
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
