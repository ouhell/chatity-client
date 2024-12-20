import { fetchFriendRequestById } from "@/routes/friends/friendRequests";
import { CQueryOptions } from "@/types/api/custom";
import { FetchFriendRequestByIdRequest } from "@/types/api/requests/friends";

import { getFilterKey } from "@/utils/libs/paramsUtils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const fetchFn = fetchFriendRequestById;

export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const getKey = (req: FetchFriendRequestByIdRequest) => {
  return ["friend-request", getFilterKey(req)];
};
const useGetFriendRequestById = (
  req: FetchFriendRequestByIdRequest,
  options?: CQueryOptions<QueryResult>
) => {
  const key = React.useMemo(() => getKey(req), [req]);
  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(req),
    select: (res) => res.data,
    ...options,
    retry(failureCount, error) {
      if (error instanceof AxiosError && error.status === 404) return false;
      if (failureCount >= 3) return false;
      return true;
    },
  });
};

export default useGetFriendRequestById;
