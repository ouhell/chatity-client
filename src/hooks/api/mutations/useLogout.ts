import { deleteUserSession } from "@/routes/auth/credentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getKey as getSessionKey } from "../queries/useGetSession";

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return deleteUserSession();
    },
    onSuccess: () => {
      queryClient.setQueriesData(
        {
          queryKey: getSessionKey(),
        },
        () => undefined
      );
      queryClient.invalidateQueries({ queryKey: getSessionKey() });
    },
  });
};

export default useLogout;
