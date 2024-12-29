import { putFriendRequest } from "@/routes/friends/friendRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { replaceQueryData } from "@/utils/libs/queryOpt";
import { FriendRequestPutRequest } from "@/types/api/requests/friends";
import {
  getKey as getFriendsKey,
  QueryResult as getFriendsQueryResult,
} from "../queries/useGetFriends";
import { getKey, QueryResult } from "../queries/useGetFriendRequests";

const useFriendRequestPut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: FriendRequestPutRequest) => {
      return putFriendRequest(request);
    },
    onSuccess: (resp, request) => {
      const friendship = resp.data;
      queryClient.setQueriesData(
        { queryKey: getKey() },
        replaceQueryData<QueryResult["data"]>((old) =>
          old.filter(
            (req) =>
              req.senderId !== request.senderId ||
              req.receiverId !== request.receiverId
          )
        )
      );
      queryClient.setQueryData(
        getFriendsKey({}),
        replaceQueryData<getFriendsQueryResult["data"]>((old) => {
          const exits = old.find(
            (fr) => fr.conversationId === friendship.conversationId
          );
          if (exits) return old;

          return [friendship, ...old];
        })
      );
    },
  });
};

export default useFriendRequestPut;
