import { LocalMessage } from "@/hooks/api/queries/useGetMessages";
import { SessionUser } from "@/types/api/responses/auth";
import { cn } from "@/utils/libs/classNames";
import { Ellipsis } from "lucide-react";

type Props = {
  data: LocalMessage;
  user: SessionUser;
};

const TextMessage = ({ data: message, user }: Props) => {
  const isSender = user.id === message.senderId;

  return (
    <div
      className={cn("flex gap-8 items-center group", {
        "flex-row-reverse": isSender,
      })}
    >
      <div
        style={{
          transition: "border-radius 0.2s ease",
        }}
        className={cn(
          "border   py-2 px-4 max-w-[80%] break-words text-left bg-slate-50 font-fun text-xl  w-fit  ",
          {
            " bg-slate-600 text-white rounded-tl-2xl  rounded-bl-2xl rounded-tr-2xl group-last:rounded-tr-none group-last:rounded-br-2xl":
              isSender,
            "rounded-tl-2xl rounded-br-2xl rounded-tr-2xl  group-last:rounded-br-none":
              !isSender,
            "animate-pulse": message.temp,
          }
        )}
      >
        {message.content}
      </div>

      {isSender && (
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Ellipsis className="opacity-70 size-5" />
        </button>
      )}
    </div>
  );
};

export default TextMessage;
