import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useGetFriendRequestById from "@/hooks/api/queries/useGetFriendRequestById";
import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { UserResp } from "@/types/api/responses/user";
import React from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { AxiosError } from "axios";
import FriendRequestBtn from "./FriendRequestBtn/FriendRequestBtn";
import FriendRequestHandler from "./FriendRequestHandler/FriendRequestHandler";
import { Check, CheckCheck } from "lucide-react";

type Props = {
  data: UserResp;
};

const UserItem = ({ data }: Props) => {
  const user = useSession()!.sessionUser!;
  const {
    data: friends,
    isError: isFriendsError,
    isLoading: isLoadingFriends,
  } = useGetFriends();
  const {
    data: request,
    error,
    isError: isRequestError,
    isLoading: isLoadingRequest,
  } = useGetFriendRequestById({
    first: user.id,
    second: data.id,
  });

  const friendShip = React.useMemo(() => {
    return friends?.find(
      (fr) => fr.friendA.id === data.id || fr.friendB.id === data.id
    );
  }, [friends, data]);

  const noRequest =
    !friendShip &&
    !isFriendsError &&
    !isLoadingFriends &&
    !isLoadingRequest &&
    isRequestError &&
    !request &&
    error instanceof AxiosError &&
    error.status === 404;

  return (
    <div
      key={data.id}
      className="flex gap-4 items-center justify-between p-4 border rounded"
    >
      <div className="flex gap-4 items-center  ">
        <div>
          <UserAvatar username={data.username} img={data.imgUrl} size={2.7} />
        </div>
        <div>{data.username}</div>
      </div>
      <div className="flex">
        {!!friendShip && (
          <div className="flex items-center opacity-70">
            <span>Friend</span>
            <span>
              <CheckCheck className="size-4" />
            </span>
          </div>
        )}
        {noRequest && <FriendRequestBtn />}
        {!!request && <FriendRequestHandler data={request} />}
      </div>
    </div>
  );
};

export default UserItem;
