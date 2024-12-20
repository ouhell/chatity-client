import useFriendRequestPost from "@/hooks/api/mutations/useFriendRequestPost";
import { Loader2 } from "lucide-react";

type Props = {
  receiverId: string;
};

const FriendRequestBtn = ({ receiverId }: Props) => {
  const { mutateAsync: postRequest, isPending } = useFriendRequestPost();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (isPending) return;
        postRequest(receiverId);
      }}
      className="border disabled:opacity-70 px-2 py-1 rounded bg-slate-600 hover:bg-slate-700 transition-colors text-white flex gap-3 items-center"
    >
      <span>Send request +</span>
      {isPending && (
        <span>
          <Loader2 className="size-4 animate-spin" />
        </span>
      )}
    </button>
  );
};

export default FriendRequestBtn;
