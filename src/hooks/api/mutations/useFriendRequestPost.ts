import { postFriendRequest } from "@/routes/friends/friendRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getKey as getRequestByIdKey } from "../queries/useGetFriendRequestById";
import {
  getKey as getFriendRequestKey,
  QueryResult,
} from "../queries/useGetFriendRequests";
import { replaceQueryData } from "@/utils/libs/queryOpt";

const useFriendRequestPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: string) => {
      return postFriendRequest(receiverId);
    },
    onSuccess: (resp) => {
      const req = resp.data;
      queryClient.setQueryData(
        getRequestByIdKey({
          first: req.senderId,
          second: req.receiverId,
        }),

        () => resp
      );
      queryClient.setQueryData(
        getFriendRequestKey(),
        replaceQueryData<QueryResult["data"]>((old) => [req, ...old])
      );
    },
  });
};

export default useFriendRequestPost;
