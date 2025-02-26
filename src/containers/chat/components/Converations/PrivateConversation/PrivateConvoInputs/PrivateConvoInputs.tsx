// import useMessagePost from "@/hooks/api/mutations/useMessagePost";
import { Paperclip, Send, Image } from "lucide-react";
import React from "react";
import RecordInput, { RecordData } from "./RecordInput/RecordInput";
import RecordingSheet from "./RecordingSheet/RecordingSheet";

type Props = {
  onSendMsg: (content: string) => void;
};

const PrivateConvoInputs = ({ onSendMsg }: Props) => {
  // const { mutateAsync: createMessage, isPending } = useMessagePost();
  const [messageContent, setMessageContent] = React.useState("");
  const [recordData, setRecordData] = React.useState<RecordData>({
    isRecording: false,
  });
  return (
    <div className="h-14 p-2 border-t shrink-0 relative">
      <RecordingSheet
        isRecording={recordData.isRecording}
        stream={recordData.recorder?.stream}
      />
      <div className="flex bg-slate-50 border rounded-r-3xl rounded-l-3xl relative h-12">
        <div className="w-full flex items-center px-4  gap-4 ">
          <div className="flex gap-2 items-center opacity-70 text-slate-700 shrink-0 overflow-hidden">
            <button className="">
              <Paperclip className="size-5" />
            </button>
            <button>
              <Image className="size-5" />
            </button>
            <RecordInput
              onRecordChange={(data) => {
                console.log("receiving recordings", data);
                setRecordData(data);
              }}
            />
          </div>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              // const formData = new FormData(e.currentTarget);
              // const messageContent = formData.get("message-content") as
              //   | string
              //   | undefined;
              const trimmedContent = messageContent?.trim();
              setMessageContent("");
              if (!trimmedContent) return;
              onSendMsg(trimmedContent);
              console.log("submiting", trimmedContent);
            }}
            className="w-full"
          >
            <input
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              name="message-content"
              autoComplete="off"
              placeholder="write message"
              className="w-full bg-transparent focus-within:outline-none focus-within:border-none border-none font-fun text-xl"
            />
          </form>
        </div>

        <button
          type="submit"
          className="absolute -right-0.5  top-0 bottom-0 w-12 text-slate-500 bg-white  hover:bg-slate-500 hover:text-white transition-colors rounded-full border  grid place-items-center"
        >
          <Send className="-translate-x-0.5 translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};

export default PrivateConvoInputs;
