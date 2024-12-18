import React from "react";

const OauthConfirmPage = () => {
  React.useEffect(() => {
    const opener = window.opener;
    console.log("opener", typeof opener, opener);
    if (!opener) return window.close();
    console.log("posting");
    opener?.postMessage(
      {
        content: window.location.search,
        type: "login",
      },
      "*"
    );
  }, []);
  return (
    <div className="h-20 grid place-items-center text-lg text-green-500 font-medium">
      Confirmed
    </div>
  );
};

export default OauthConfirmPage;
