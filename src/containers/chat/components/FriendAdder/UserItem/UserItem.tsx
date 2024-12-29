import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { UserResp } from "@/types/api/responses/user";
import React from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";
import FriendRequestBtn from "./FriendRequestBtn/FriendRequestBtn";
import FriendRequestHandler from "./FriendRequestHandler/FriendRequestHandler";
import { CheckCheck, Loader2 } from "lucide-react";
import useGetFriendRequests from "@/hooks/api/queries/useGetFriendRequests";

type Props = {
  data: UserResp;
};

const UserItem = ({ data }: Props) => {
  // const user = useSession()!.sessionUser!;
  const {
    data: friends,
    isError: isFriendsError,
    isLoading: isLoadingFriends,
  } = useGetFriends();

  const {
    data: friendRequests,
    isLoading: isLoadingRequest,
    // isError: isRequestError,
  } = useGetFriendRequests();
  // const {
  //   data: request,
  //   error,
  //   isError: isRequestError,
  //   isLoading: isLoadingRequest,
  // } = useGetFriendRequestById({
  //   first: user.id,
  //   second: data.id,
  // });

  const request = React.useMemo(() => {
    return friendRequests?.find(
      (req) => req.senderId === data.id || req.receiverId === data.id
    );
  }, [friendRequests, data.id]);

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
    // isRequestError &&
    !request &&
    !!friendRequests;
  const isLoading = isLoadingFriends || isLoadingRequest;
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
        {!!friendShip && !isLoadingFriends && (
          <div className="flex items-center opacity-70">
            <span>Friend</span>
            <span>
              <CheckCheck className="size-4" />
            </span>
          </div>
        )}
        {noRequest && <FriendRequestBtn receiverId={data.id} />}
        {!!request && <FriendRequestHandler data={request} />}
        {isLoading && (
          <div className="px-4 grid place-items-center text-slate-600">
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
