import { SessionUser } from "@/types/api/responses/auth";
import { MessageResp } from "@/types/api/responses/message";
import { cn } from "@/utils/libs/classNames";
import React from "react";

type Props = {
  data: MessageResp;
  user: SessionUser;
};

const TextMessage = ({ data: message, user }: Props) => {
  const isSender = user.id === message.senderId;

  return (
    <div
      className={cn(
        "border  rounded p-2 max-w-[80%] font-fun text-xl text-center w-fit min-w-[4rem]",
        {
          "ml-auto bg-slate-600 text-white": isSender,
        }
      )}
    >
      {message.content}
    </div>
  );
};

export default TextMessage;
