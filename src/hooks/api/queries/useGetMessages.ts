import { fetchMessages } from "@/routes/conversations/messagesApi";

import { CQueryOptions } from "@/types/api/custom";

import { useQuery } from "@tanstack/react-query";
import { MessagesGetFilter } from "../../../types/api/requests/message";
import { getFilterKey } from "@/utils/libs/paramsUtils";

const fetchFn = fetchMessages;

export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const getKey = (filter: MessagesGetFilter) => {
  const filterKey = getFilterKey(filter);
  return ["messages", filterKey];
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
