import { credentialSignUp } from "@/routes/auth/credentials";
import { CredentialSignUpRequest } from "@/types/api/requests/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../queries/useGetSession";

const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CredentialSignUpRequest) => {
      return credentialSignUp(request);
    },
    onSuccess: (resp) => {
      queryClient.setQueryData(getKey(), () => {
        return resp;
      });
    },
  });
};

export default useSignUp;
