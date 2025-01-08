import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  MessagePostParams,
  MessagePostRequest,
} from "@/types/api/requests/message";
import { postMessage } from "@/routes/conversations/messagesApi";
import { getKey, LocalMessage, QueryResult } from "../queries/useGetMessages";
import { replaceQueryData } from "@/utils/libs/queryOpt";
import { useSession } from "@/context/UserSessionContext/UserSessionContext";

type MessagePostMutationRequest = {
  message: MessagePostRequest;
  params: MessagePostParams;
};

const useMessagePost = () => {
  const user = useSession()!.sessionUser!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MessagePostMutationRequest) => {
      return postMessage(request.message, request.params);
    },
    onMutate: (request) => {
      const msg = request.message;
      const date = new Date().toISOString();
      const tempId = crypto.randomUUID();
      const temporaryMessage: LocalMessage = {
        id: tempId,
        content: msg.content,
        conversationId: msg.conversationId,
        createdAt: date,
        updatedAt: date,
        isEdited: false,
        images: [],
        recording: null,
        recordingId: null,
        senderId: user.id,
        temp: true,
      };
      queryClient.setQueryData(
        getKey({ conversationId: request.message.conversationId }),
        replaceQueryData<QueryResult["data"]>((old) => {
          return [...old, temporaryMessage];
        })
      );
      return tempId;
    },
    onSuccess: (resp, _req, tempId) => {
      console.log("sucess");
      queryClient.setQueryData(
        getKey({ conversationId: resp.data.conversationId }),
        replaceQueryData<QueryResult["data"]>((old) => {
          const found = old.find((msg) => msg.id === tempId);

          if (found)
            return old.map((msg) => {
              if (msg.id === found.id) {
                return { ...msg, realId: resp.data.id, temp: false };
              }
              return msg;
            });
          return [...old, resp.data];
        })
      );
    },
  });
};

export default useMessagePost;
