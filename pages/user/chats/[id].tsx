import { useMutation, useQuery } from "@apollo/client";
import Avatar from "@components/Avatar";
import Layout from "@components/Layout";
import LoadingSpiner from "@components/LoadingSpiner";
import Message from "@components/Message";
import useUser from "@libs/client/hooks/useUser";
import { SEND_MESSAGE_MUTATION } from "@libs/server/mutations/send-message-gql";
import {
  sendMessage,
  sendMessageVariables,
} from "@libs/server/mutations/__generated__/sendMessage";
import { READ_MESSAGES_QUERY } from "@libs/server/queries/readMessages.gql";
import {
  readMessages,
  readMessagesVariables,
  readMessages_readMessages_messages,
} from "@libs/server/queries/__generated__/readMessages";
import { TAKE_MESSAGE_SUBSCRIPTION } from "@libs/server/subscriptions/take-message.gql";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ISendMessage {
  payload: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { data: meData } = useUser();
  const {
    query: { id },
  } = router;
  const { data, loading, subscribeToMore } = useQuery<
    readMessages,
    readMessagesVariables
  >(READ_MESSAGES_QUERY, {
    variables: {
      input: {
        roomId: +(id as string),
      },
    },
    // pollInterval: 500,
  });

  const [sendMessageMutate, { loading: sendMessageLoading }] = useMutation<
    sendMessage,
    sendMessageVariables
  >(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      reset();
    },
  });

  const { register, handleSubmit, reset } = useForm<ISendMessage>();

  const onSubmit: SubmitHandler<ISendMessage> = ({ payload }) => {
    sendMessageMutate({
      variables: {
        input: {
          payload,
          roomId: +(id as string),
        },
      },
    });
  };

  useEffect(() => {
    if (!id) return;
    subscribeToMore({
      document: TAKE_MESSAGE_SUBSCRIPTION,
      variables: { input: { roomId: +(id as string) } },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.takeMessage;
        return Object.assign({}, prev, {
          readMessages: {
            messages: [
              ...(prev.readMessages
                .messages as readMessages_readMessages_messages[]),
              newMessage,
            ],
          },
        });
      },
    });
  }, [id, subscribeToMore]);

  return (
    <Layout seoTitle="Chats" hasStatusBar={false} isChatPage>
      <div>
        <div className="py-2 bg-sky-600 shadow-sm border-black fixed top-0 w-[482px]  z-10">
          <Link href={"/user/chats"}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpiner />
          </div>
        ) : (
          <div className="relative grid grid-rows-5 mt-16">
            <Message
              messages={data?.readMessages.messages}
              meId={meData?.whoAmI.id}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[480px] fixed bottom-0 "
            >
              <textarea
                {...register("payload", { required: true })}
                className="w-full h-28 resize-none p-1"
                cols={5}
              />
              <button className="bg-yellow-300  text-sm w-12 h-7 absolute right-2 top-1">
                <div className="flex justify-center items-center">
                  {sendMessageLoading ? (
                    <div className="ml-4">
                      <LoadingSpiner />{" "}
                    </div>
                  ) : (
                    "전송"
                  )}
                </div>
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChatDetail;
