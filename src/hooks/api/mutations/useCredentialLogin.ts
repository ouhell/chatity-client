import { credentialLogin } from "@/routes/auth/credentials";
import { CredentialLoginRequest } from "@/types/api/requests/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getKey as getSessionKey } from "../queries/useGetSession";

const useCredentialLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CredentialLoginRequest) => {
      return credentialLogin(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getSessionKey(),
      });
    },
  });
};

export default useCredentialLogin;
