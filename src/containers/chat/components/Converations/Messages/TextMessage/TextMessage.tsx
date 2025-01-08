import { LocalMessage } from "@/hooks/api/queries/useGetMessages";
import { SessionUser } from "@/types/api/responses/auth";
import { cn } from "@/utils/libs/classNames";

type Props = {
  data: LocalMessage;
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
          "animate-pulse": message.temp,
        }
      )}
    >
      {message.content}
    </div>
  );
};

export default TextMessage;
