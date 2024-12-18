import { FetchFriendsFilter } from "@/types/api/requests/friends";
import { FriendShipResp } from "@/types/api/responses/friends";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import { fetchQuerySerializer } from "@/utils/libs/paramsUtils";
import axios from "axios";
export const fetchFriends = (filter?: FetchFriendsFilter) => {
  return axios<FriendShipResp[]>({
    url: API_URL_V1 + "/friends",
    withCredentials: true,
    params: filter,
    paramsSerializer: fetchQuerySerializer,
  });
};
