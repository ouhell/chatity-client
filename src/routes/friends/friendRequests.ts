import { FetchFriendRequestByIdRequest } from "@/types/api/requests/friends";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import axios from "axios";

export const fetchFriendRequestById = (
  request: FetchFriendRequestByIdRequest
) => {
  return axios({
    url: `${API_URL_V1}/friend-request/${request.first}/${request.second}`,
  });
};
