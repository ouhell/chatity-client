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
        "border   p-2 max-w-[80%] bg-slate-50 font-fun text-xl text-center w-fit min-w-[4rem] ",
        {
          "ml-auto bg-slate-600 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl last:rounded-bl-none":
            isSender,
          "rounded-tl-2xl rounded-br-2xl rounded-tr-2xl last:rounded-br-none":
            !isSender,
          "animate-pulse": message.temp,
        }
      )}
    >
      {message.content}
    </div>
  );
};

export default TextMessage;
