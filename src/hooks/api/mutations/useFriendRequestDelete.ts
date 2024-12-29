import { deleteFriendRequest } from "@/routes/friends/friendRequests";
import { FriendRequestDeleteRequest } from "@/types/api/requests/friends";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKey as getFriendRequestKey,
  QueryResult,
} from "../queries/useGetFriendRequests";
import { replaceQueryData } from "@/utils/libs/queryOpt";

const useFriendRequestDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: FriendRequestDeleteRequest) => {
      return deleteFriendRequest(request);
    },
    onSuccess: (_res, v) => {
      queryClient.setQueriesData(
        {
          queryKey: getFriendRequestKey(),
        },
        replaceQueryData<QueryResult["data"]>((old) =>
          old.filter(
            (req) =>
              req.senderId != v.senderId || req.receiverId != v.receiverId
          )
        )
      );
    },
  });
};

export default useFriendRequestDelete;
