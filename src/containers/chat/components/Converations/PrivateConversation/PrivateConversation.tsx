import React from "react";
import { useParams } from "react-router-dom";
import PrivateConvoHeader from "./PrivateConvoHeader/PrivateConvoHeader";
import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import PrivateConvoInputs from "./PrivateConvoInputs/PrivateConvoInputs";

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

  return (
    <div className="flex-1 ">
      {!!friend && !!friendship && (
        <div className="flex flex-col justify-between h-full ">
          <PrivateConvoHeader friend={friend} friendship={friendship} />
          <div className="h-full"></div>
          <PrivateConvoInputs />
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
