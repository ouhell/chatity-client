export type FetchFriendsFilter = {
  username?: string;
};

export type FetchFriendRequestByIdRequest = {
  first: string;
  second: string;
};

export type FriendRequestPutRequest = {
  senderId: string;
  receiverId: string;
};

export type FriendRequestDeleteRequest = {
  senderId: string;
  receiverId: string;
};
