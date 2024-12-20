import { FetchFriendRequestByIdRequest } from "@/types/api/requests/friends";
import { FriendRequestResp } from "@/types/api/responses/friends";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import axios from "axios";

export const fetchFriendRequests = () => {
  return axios<FriendRequestResp[]>({
    url: API_URL_V1 + "/friend-requests",
    withCredentials: true,
  });
};

export const fetchFriendRequestById = (
  request: FetchFriendRequestByIdRequest
) => {
  return axios<FriendRequestResp>({
    url: `${API_URL_V1}/friend-requests/${request.first}/${request.second}`,
    withCredentials: true,
  });
};

export const postFriendRequest = (receiverId: string) => {
  return axios<FriendRequestResp>({
    url: `${API_URL_V1}/friend-requests/${receiverId}`,
    method: "post",
    withCredentials: true,
  });
};
