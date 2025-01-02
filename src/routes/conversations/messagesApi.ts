import {
  MessagePostRequest,
  PrivateMessagePostRequest,
} from "@/types/api/requests/message";
import { MessageResp } from "@/types/api/responses/message";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import axios from "axios";

export const postPrivateMessage = (request: PrivateMessagePostRequest) => {
  return axios<MessageResp>({
    url:
      API_URL_V1 +
      `/friendship/${request.friendshipId.friendAId}/${request.friendshipId.friendBId}/messages`,
    method: "post",
    data: request.message,
    withCredentials: true,
  });
};
