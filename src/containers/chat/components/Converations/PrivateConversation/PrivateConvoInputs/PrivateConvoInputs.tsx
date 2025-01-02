import { Paperclip, Send, Image, Mic } from "lucide-react";

const PrivateConvoInputs = () => {
  return (
    <div className="h-14 p-2 border-t shrink-0">
      <div className="flex bg-slate-50 border rounded-r-3xl rounded-l-3xl relative h-12">
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
              placeholder="write message"
              className="w-full bg-transparent focus-within:outline-none focus-within:border-none border-none font-fun text-xl"
            />
          </div>
        </div>

        <button className="absolute -right-0.5  top-0 bottom-0 w-12 text-slate-500 bg-white  hover:bg-slate-500 hover:text-white transition-colors rounded-full border  grid place-items-center">
          <Send className="-translate-x-0.5 translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};

export default PrivateConvoInputs;
