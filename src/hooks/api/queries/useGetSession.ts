import { fetchUserSession } from "@/routes/auth/credentials";
import { useQuery } from "@tanstack/react-query";

export const fetchFn = fetchUserSession;
export type QueryResult = Awaited<ReturnType<typeof fetchFn>>;
export const primaryKey = "user-sesssion";
export const getKey = () => {
  return [primaryKey];
};
const useGetSession = () => {
  return useQuery({
    queryKey: getKey(),
    queryFn: () => {
      return fetchFn();
    },
    select: (res) => res.data,
  });
};

export default useGetSession;
