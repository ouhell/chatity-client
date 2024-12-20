import useGetFriendRequests from "@/hooks/api/queries/useGetFriendRequests";
import FriendRequestItem from "./FriendRequestItem/FriendRequestItem";

const RequestSection = () => {
  const { data: friendRequests, isLoading, isError } = useGetFriendRequests();

  return (
    <div className="h-full min-h-fit">
      {!!friendRequests && !!friendRequests.length && (
        <div className="flex gap-2 pt-2">
          {friendRequests.map((req) => {
            return (
              <FriendRequestItem
                key={req.senderId + "/" + req.receiverId}
                data={req}
              />
            );
          })}
        </div>
      )}

      {!!friendRequests && !friendRequests.length && (
        <div className="h-full grid place-items-center">
          <div className="font-semibold opacity-50 ">Empty</div>
        </div>
      )}

      {!friendRequests && isLoading && (
        <div className="h-full grid place-items-center">
          <div className="font-semibold opacity-50 ">Loading...</div>
        </div>
      )}

      {!friendRequests && isError && (
        <div className="h-full grid place-items-center">
          <div className="font-semibold text-red-700 opacity-50 ">Error</div>
        </div>
      )}
    </div>
  );
};

export default RequestSection;
