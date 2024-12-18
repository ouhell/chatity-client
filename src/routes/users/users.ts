import { FetchUsersFilter } from "@/types/api/requests/users";
import { UserResp } from "@/types/api/responses/user";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import { fetchQuerySerializer } from "@/utils/libs/paramsUtils";
import axios from "axios";

export const fetchUsers = (filter?: FetchUsersFilter) => {
  return axios<UserResp[]>({
    url: API_URL_V1 + "/users",
    params: filter,
    withCredentials: true,
    paramsSerializer: fetchQuerySerializer,
  });
};
