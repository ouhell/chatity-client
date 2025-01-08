export type MessagePostRequest = {
  content: string;
  conversationId: string;
};

export type MessagePostParams = {
  friendshipId?: {
    friendAId: string;
    friendBId: string;
  };
};

export type MessagesGetFilter = {
  conversationId: string;
  friendshipId?: {
    friendAId: string;
    friendBId: string;
  };
};
