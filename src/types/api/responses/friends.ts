import { UserResp } from "./user";

export type FriendShipResp = {
  friendA: UserResp;
  friendB: UserResp;
  conversationId: string;
};

export type FriendRequestResp = {
  senderId: string;
  receiverId: string;
  sender: UserResp;
  receiver: UserResp;
  createdAt: string;
};
