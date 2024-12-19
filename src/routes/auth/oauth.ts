import { SessionResp } from "@/types/api/responses/auth";
import axios from "axios";

export const googleOauthLogin = (code: string) => {
  return axios<SessionResp>({
    url: "http://localhost:4000/api/v1/auth/google",
    method: "post",
    data: {
      code: code,
    },
    withCredentials: true,
  });
};
