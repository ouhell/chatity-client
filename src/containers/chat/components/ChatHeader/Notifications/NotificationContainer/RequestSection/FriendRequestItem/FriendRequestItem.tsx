import UserAvatar from "@/containers/chat/components/UserAvatar/UserAvatar";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import { FriendRequestResp } from "@/types/api/responses/friends";
import FriendRequestActionBtn from "./FriendRequestActionBtn/FriendRequestActionBtn";

type Props = {
  data: FriendRequestResp;
};

const FriendRequestItem = ({ data }: Props) => {
  const user = useSession()!.sessionUser!;
  const otherParty = user.id === data.sender.id ? data.sender : data.receiver;

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex">
        <UserAvatar img={otherParty.imgUrl} username={otherParty.username} />
        <div>
          <span className="text-slate-700">{otherParty.username}</span>
          <span className="text-sm text-slate-500">{otherParty.email}</span>
        </div>
      </div>

      <FriendRequestActionBtn data={data} />
    </div>
  );
};

export default FriendRequestItem;
