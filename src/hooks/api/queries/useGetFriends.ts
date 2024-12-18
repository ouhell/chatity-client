import { fetchFriends } from "@/routes/friends/friends";
import { FetchFriendsFilter } from "@/types/api/requests/friends";
import { getFilterKey } from "@/utils/libs/paramsUtils";
import { useQuery } from "@tanstack/react-query";
const fetchFn = fetchFriends;
export const getKey = (filter: FetchFriendsFilter) => {
  return ["friends", getFilterKey(filter)];
};
const useGetFriends = (filter?: FetchFriendsFilter) => {
  const key = getKey(filter ?? {});
  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(filter),
    select: (res) => res.data,
  });
};

export default useGetFriends;
