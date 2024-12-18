import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const OauthBtn = ({ loading, onClick, children }: Props) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="size-8 rounded-full border hover:scale-105 hover:border-gray-600 transition-all grid place-items-center  "
    >
      {loading ? <Loader2 className="size-3 animate-spin" /> : children}
    </button>
  );
};

export default OauthBtn;
