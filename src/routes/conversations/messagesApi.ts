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
  { friendShipId, ...params }: MessagePostParams
) => {
  return axios<MessageResp>({
    url: API_URL_V1 + `/messges`,
    method: "post",
    data: request,
    withCredentials: true,
    params: {
      ...friendShipId,
      ...params,
    },
  });
};

export const fetchMessages = (filter: MessagesGetFilter) => {
  return axios<MessageResp[]>({
    url: API_URL_V1 + "/messages",
    method: "get",
    withCredentials: true,
    params: filter,
  });
};
