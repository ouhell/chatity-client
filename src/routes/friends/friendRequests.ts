import {
  FetchFriendRequestByIdRequest,
  FriendRequestDeleteRequest,
  FriendRequestPutRequest,
} from "@/types/api/requests/friends";
import {
  FriendRequestResp,
  FriendShipResp,
} from "@/types/api/responses/friends";
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

export const putFriendRequest = (request: FriendRequestPutRequest) => {
  return axios<FriendShipResp>({
    url: `${API_URL_V1}/friend-requests/${request.senderId}/${request.receiverId}`,
    method: "put",
    withCredentials: true,
  });
};

export const deleteFriendRequest = (request: FriendRequestDeleteRequest) => {
  return axios({
    url: `${API_URL_V1}/friend-requests/${request.senderId}/${request.receiverId}`,
    method: "delete",
    withCredentials: true,
  });
};
