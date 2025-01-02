import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  MessagePostParams,
  MessagePostRequest,
} from "@/types/api/requests/message";
import { postMessage } from "@/routes/conversations/messagesApi";
import { getKey, QueryResult } from "../queries/useGetMessages";
import { replaceQueryData } from "@/utils/libs/queryOpt";

type MessagePostMutationRequest = {
  message: MessagePostRequest;
  params: MessagePostParams;
};

const useMessagePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MessagePostMutationRequest) => {
      return postMessage(request.message, request.params);
    },
    onSuccess: (resp) => {
      queryClient.setQueryData(
        getKey({ conversationId: resp.data.conversationId }),
        replaceQueryData<QueryResult["data"]>((old) => {
          const found = old.find((msg) => msg.id === resp.data.id);
          if (found) return old;
          return [...old, resp.data];
        })
      );
    },
  });
};

export default useMessagePost;
