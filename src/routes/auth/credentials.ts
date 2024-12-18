import { CredentialLoginRequest } from "@/types/api/requests/auth";
import { SessionResp } from "@/types/api/responses/auth";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import axios from "axios";

export const fetchUserSession = () => {
  return axios<SessionResp>({
    url: API_URL_V1 + "/auth/session",
    method: "get",
    withCredentials: true,
  });
};

export const deleteUserSession = () => {
  return axios({
    url: API_URL_V1 + "/auth/logout",
    method: "delete",
    withCredentials: true,
  });
};

export const credentialLogin = (request: CredentialLoginRequest) => {
  return axios({
    url: API_URL_V1 + "/auth/login",
    method: "post",
    data: request,
    withCredentials: true,
  });
};
