import { FriendShipResp } from "@/types/api/responses/friends";
import { UserResp } from "@/types/api/responses/user";
import React from "react";
import UserAvatar from "../../../UserAvatar/UserAvatar";
import { Menu } from "lucide-react";

type Props = {
  friendship: FriendShipResp;
  friend: UserResp;
};

const PrivateConvoHeader = ({ friendship, friend }: Props) => {
  return (
    <div className="h-14 border-b flex items-center justify-between ">
      <div className="flex gap-4">
        <UserAvatar username={friend.username} img={friend.imgUrl} size={2.5} />
        <div>
          <div>{friend.username}</div>
          <div className="text-sm opacity-70 -mt-1.5">{friend.email}</div>
        </div>
      </div>

      <button className="text-slate-700">
        <Menu />
      </button>
    </div>
  );
};

export default PrivateConvoHeader;
