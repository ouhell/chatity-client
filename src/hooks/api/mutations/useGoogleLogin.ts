import { googleOauthLogin } from "@/routes/auth/oauth";
import { openGoogleOauthWindow } from "@/utils/libs/oauthOpt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getKey as getSessionKey } from "../queries/useGetSession";

const fn = async () => {
  const resp = await openGoogleOauthWindow();
  console.log("google oauth resp", resp);
  return googleOauthLogin(resp.code);
};

const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return fn();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getSessionKey(),
      });
    },
  });
};

export default useGoogleLogin;
