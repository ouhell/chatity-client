import { UserResp } from "./user";

export type FriendShipResp = {
  friendA: UserResp;
  friendB: UserResp;
  conversationId: string;
};

export type FriendRequestResp = {
  senderId: string;
  receiverId: string;
  createdAt: string;
};
