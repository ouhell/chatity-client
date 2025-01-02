// import useMessagePost from "@/hooks/api/mutations/useMessagePost";
import { Paperclip, Send, Image, Mic } from "lucide-react";

type Props = {
  onSendMsg: (content: string) => void;
};

const PrivateConvoInputs = ({ onSendMsg }: Props) => {
  // const { mutateAsync: createMessage, isPending } = useMessagePost();
  return (
    <div className="h-14 p-2 border-t shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const messageContent = formData.get("message-content") as
            | string
            | undefined;
          const trimmedContent = messageContent?.trim();
          if (!trimmedContent) return;
          onSendMsg(trimmedContent);
          console.log("submiting", trimmedContent);
        }}
        className="flex bg-slate-50 border rounded-r-3xl rounded-l-3xl relative h-12"
      >
        <div className="w-full flex items-center px-4  gap-4 ">
          <div className="flex gap-2 items-center opacity-70 text-slate-700 shrink-0 overflow-hidden">
            <button className="">
              <Paperclip className="size-5" />
            </button>
            <button>
              <Image className="size-5" />
            </button>
            <button>
              <Mic className="size-5" />
            </button>
          </div>
          <div className="w-full">
            <input
              name="message-content"
              placeholder="write message"
              className="w-full bg-transparent focus-within:outline-none focus-within:border-none border-none font-fun text-xl"
            />
          </div>
        </div>

        <button
          type="submit"
          className="absolute -right-0.5  top-0 bottom-0 w-12 text-slate-500 bg-white  hover:bg-slate-500 hover:text-white transition-colors rounded-full border  grid place-items-center"
        >
          <Send className="-translate-x-0.5 translate-y-0.5" />
        </button>
      </form>
    </div>
  );
};

export default PrivateConvoInputs;
