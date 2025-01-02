import { fetchFriendRequests } from "@/routes/friends/friendRequests";

import { CQueryOptions } from "@/types/api/custom";

import { useQuery } from "@tanstack/react-query";

const fetchFn = fetchFriendRequests;

export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const getKey = () => {
  return ["friend-requests"];
};
const useGetMessages = (options?: CQueryOptions<QueryResult>) => {
  const key = getKey();
  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(),
    select: (res) => res.data,
    ...options,
  });
};

export default useGetMessages;
