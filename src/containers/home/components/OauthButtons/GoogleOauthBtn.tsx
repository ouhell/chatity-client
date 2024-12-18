import useGoogleLogin from "@/hooks/api/mutations/useGoogleLogin";
import OauthBtn from "./OauthBtn";

const GoogleOauthBtn = () => {
  const { mutateAsync, isPending } = useGoogleLogin();

  return (
    <OauthBtn
      loading={isPending}
      onClick={() => {
        mutateAsync()
          .then((res) => {
            console.log("google oauth res", res);
          })
          .catch((e) => {
            console.log("error", e);
          });
      }}
    >
      <span className="text-lg text-green-600">G</span>
    </OauthBtn>
  );
};

export default GoogleOauthBtn;
