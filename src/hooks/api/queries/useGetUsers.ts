import { fetchUsers } from "@/routes/users/users";
import { CQueryOptions } from "@/types/api/custom";

import { FetchUsersFilter } from "@/types/api/requests/users";
import { getFilterKey } from "@/utils/libs/paramsUtils";
import { useQuery } from "@tanstack/react-query";

const fetchFn = fetchUsers;

export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const getKey = (filter: FetchUsersFilter) => {
  return ["users", getFilterKey(filter)];
};
const useGetUsers = (
  filter?: FetchUsersFilter,
  options?: CQueryOptions<QueryResult>
) => {
  const key = getKey(filter ?? {});
  return useQuery({
    queryKey: key,
    queryFn: () => fetchFn(filter),
    select: (res) => res.data,
    ...options,
  });
};

export default useGetUsers;
