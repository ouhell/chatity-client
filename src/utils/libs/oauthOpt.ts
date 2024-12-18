import { z } from "zod";
import { GOOGLE_CLIENT_ID } from "../constants/oauthConsts";

const googleOauthRespTemplate = z.object({
  code: z.string(),
});

export type GoogleOauthResp = z.infer<typeof googleOauthRespTemplate>;

export const openOauthWindow = async (authUrl: URL) => {
  return new Promise<URLSearchParams>((resolve, reject) => {
    authUrl.searchParams.set(
      "redirect_uri",
      window.location.hostname + "/auth/confirm"
    );
    authUrl.searchParams.set(
      "redirect_uri",
      "http://localhost:3000/auth/confirm"
    );

    const newWindow = window.open(
      authUrl.toString(),
      "_black",
      "popup,width=600,height=800"
    );
    if (!newWindow) return reject();

    const handleLogin = (env: MessageEvent) => {
      console.log("got message", env.data);
      if (!env.data) return;
      if (env.data?.type !== "login") return;
      if (typeof env.data.content !== "string") return newWindow.close();
      resolve(new URLSearchParams(env.data.content));
      newWindow.close();
    };
    window.addEventListener("message", handleLogin);

    const pollTime = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(pollTime);
        window.removeEventListener("message", handleLogin);
        reject();
      }
    }, 500);
  });
};

export const openGoogleOauthWindow = async () => {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("prompt", "consent");
  authUrl.searchParams.append("scope", "email profile");

  return openOauthWindow(authUrl).then((res) => {
    console.log("res string", res.toString());
    const resObj = {
      code: res.get("code"),
    };
    const googleOauthResp = googleOauthRespTemplate.parse(resObj);
    return googleOauthResp;
  });
};
