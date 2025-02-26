import useGetMessages from "@/hooks/api/queries/useGetMessages";
import { FriendShipResp } from "@/types/api/responses/friends";
import TextMessage from "../../Messages/TextMessage/TextMessage";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import React from "react";
import { MessageResp } from "@/types/api/responses/message";

type Props = {
  conversationId: string;
  friendship: FriendShipResp;
};

const PrivateConversationMessages = ({ friendship, conversationId }: Props) => {
  const user = useSession()!.sessionUser!;
  const lastMessageRef = React.useRef<MessageResp | null>(null);
  const messageContainerRef = React.useRef<React.ElementRef<"div">>(null);
  const { data: messages, isLoading: isLoadingMessages } = useGetMessages(
    {
      conversationId: conversationId!,
      friendshipId: friendship
        ? {
            friendAId: friendship.friendAId,
            friendBId: friendship.friendBId,
          }
        : undefined,
    },
    { enabled: !!friendship }
  );

  React.useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    const lastMessage = messages?.length
      ? messages[messages.length - 1]
      : undefined;
    if (!!lastMessage && lastMessageRef.current?.id !== lastMessage.id) {
      console.log("scrolling");
      container.scrollBy({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div
      className="h-full  max-h-full overflow-auto px-2 pb-2 pt-4  "
      ref={messageContainerRef}
    >
      {!!messages?.length && (
        <div className="flex flex-col gap-2">
          {messages.map((msg) => {
            return <TextMessage key={msg.id} data={msg} user={user} />;
          })}
        </div>
      )}
      {!messages?.length && (
        <div className="h-full grid place-items-center">
          {isLoadingMessages ? <span>loading....</span> : <span>Empty</span>}
        </div>
      )}
    </div>
  );
};

export default PrivateConversationMessages;
