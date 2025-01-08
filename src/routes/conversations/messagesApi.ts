import {
  MessagePostParams,
  MessagePostRequest,
  MessagesGetFilter,
} from "@/types/api/requests/message";
import { MessageResp } from "@/types/api/responses/message";
import { API_URL_V1 } from "@/utils/constants/apiConsts";
import axios from "axios";

export const postMessage = (
  request: MessagePostRequest,
  { friendshipId, ...params }: MessagePostParams
) => {
  return axios<MessageResp>({
    url: API_URL_V1 + `/conversations/${request.conversationId}/messages`,
    method: "post",
    data: request,
    withCredentials: true,
    params: {
      ...friendshipId,
      ...params,
    },
  });
};

export const fetchMessages = (filter: MessagesGetFilter) => {
  return axios<MessageResp[]>({
    url: API_URL_V1 + `/conversations/${filter.conversationId}/messages`,
    method: "get",
    withCredentials: true,
    params: filter,
  });
};
