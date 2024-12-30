import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import { FriendShipResp } from "@/types/api/responses/friends";
import React from "react";
import { Link, useParams } from "react-router-dom";
import UserAvatar from "../../../UserAvatar/UserAvatar";
import { cn } from "@/utils/libs/classNames";

type Props = {
  data: FriendShipResp;
};

const FriendItem = ({ data: friendship }: Props) => {
  const user = useSession()!.sessionUser!;
  const { conversationId } = useParams();
  const friend =
    user.id === friendship.friendA.id ? friendship.friendB : friendship.friendA;

  const isActive = React.useMemo(() => {
    return conversationId === friendship.conversationId;
  }, [conversationId, friendship]);
  return (
    <Link
      key={friend.id}
      to={"/conversations/private/" + friendship.conversationId}
    >
      <div
        className={cn(
          "flex gap-3 items-center p-2 rounded  min-h-16  hover:bg-slate-50 transition-colors",
          {
            "bg-black text-white": isActive,
          }
        )}
      >
        <div className="">
          <UserAvatar size={3} username={friend.username} img={friend.imgUrl} />
        </div>
        <div className="h-full  flex-1">
          <div className=" text-lg font-semibold">{friend.username}</div>
          <div className="h-4  opacity-75 font-fun -mt-1"></div>
        </div>
      </div>
    </Link>
  );
};

export default FriendItem;
