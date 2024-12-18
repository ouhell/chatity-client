import { UserResp } from "./user";

export type FriendShipResp = {
  friendA: UserResp;
  friendB: UserResp;
  conversationId: string;
};
