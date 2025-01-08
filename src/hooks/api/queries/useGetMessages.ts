import { fetchMessages } from "@/routes/conversations/messagesApi";

import { CQueryOptions } from "@/types/api/custom";

import { useQuery } from "@tanstack/react-query";
import { MessagesGetFilter } from "../../../types/api/requests/message";
import { MessageResp } from "@/types/api/responses/message";
// import { getFilterKey } from "@/utils/libs/paramsUtils";
import { AxiosResponse } from "axios";
export type LocalMessage = MessageResp & {
  temp?: boolean;
  realId?: boolean;
};
const fetchFn = (
  filter: MessagesGetFilter
): Promise<AxiosResponse<LocalMessage[]>> =>
  fetchMessages(filter).then((res) => ({ ...res, data: res.data.reverse() }));

export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const getKey = (filter: MessagesGetFilter) => {
  return ["messages", "conversationId=" + filter.conversationId];
};
const useGetMessages = (
  filter: MessagesGetFilter,
  options?: CQueryOptions<QueryResult>
) => {
  const key = getKey(filter);
  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(filter),
    select: (res) => res.data,
    ...options,
  });
};

export default useGetMessages;
