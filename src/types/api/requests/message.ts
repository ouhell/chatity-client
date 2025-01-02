export type MessagePostRequest = {
  content: string;
  conversationId: string;
};

export type MessagePostParams = {
  friendShipId?: {
    friendAId: string;
    friendBId: string;
  };
};

export type MessagesGetFilter = {
  conversationId: string;
};
