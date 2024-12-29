import UserAvatar from "@/containers/chat/components/UserAvatar/UserAvatar";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import { FriendRequestResp } from "@/types/api/responses/friends";
import FriendRequestActionBtn from "./FriendRequestActionBtn/FriendRequestActionBtn";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestItem = ({ data }: Props) => {
  const user = useSession()!.sessionUser!;
  const otherParty = user.id === data.sender.id ? data.receiver : data.sender;

  return (
    <div className="flex justify-between items-center gap-4 w-full  ">
      <div className="flex gap-2  overflow-hidden">
        <div className="mt-2">
          <UserAvatar
            img={otherParty.imgUrl}
            username={otherParty.username}
            size={3}
          />
        </div>

        <div className="max-w-full overflow-hidden  ">
          <div className="text-slate-700 font-semibold font-fun  text-2xl whitespace-nowrap overflow-ellipsis">
            {otherParty.username}
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap hover:underline hover:text-slate-600 transition-colors">
            {otherParty.email}
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <FriendRequestActionBtn data={data} />
      </div>
    </div>
  );
};

export default FriendRequestItem;
