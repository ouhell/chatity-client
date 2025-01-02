export type MessagePostRequest = {
  content: string;
  conversationId: string;
};

export type PrivateMessagePostRequest = {
  friendshipId: {
    friendAId: string;
    friendBId: string;
  };
  message: MessagePostRequest;
};
