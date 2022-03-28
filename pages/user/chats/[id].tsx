import { useQuery } from "@apollo/client";
import Avatar from "@components/Avatar";
import Layout from "@components/Layout";
import LoadingSpiner from "@components/LoadingSpiner";
import useUser from "@libs/client/hooks/useUser";
import { READ_MESSAGES_QUERY } from "@libs/server/queries/readMessages.gql";
import {
  readMessages,
  readMessagesVariables,
} from "@libs/server/queries/__generated__/readMessages";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { data: meData } = useUser();
  const {
    query: { id },
  } = router;
  const { data, loading } = useQuery<readMessages, readMessagesVariables>(
    READ_MESSAGES_QUERY,
    {
      variables: {
        input: {
          roomId: +(id as string),
        },
      },
    }
  );
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
            <div className="h-full px-2 pb-36  row-span-4 space-y-2">
              {data?.readMessages.messages?.map((message, idx) =>
                message.user.id !== meData?.whoAmI.id ? (
                  <div key={message.id} className="flex">
                    {idx === 0 && (
                      <div className="flex space-x-2">
                        <Avatar size={"FRIEND"} />
                        <div>
                          <div className="text-sm">{message.user.name} </div>
                          <div className="bg-white  px-1 rounded-sm shadow-sm mt-1">
                            {message.payload}
                          </div>
                        </div>
                      </div>
                    )}
                    {idx !== 0 &&
                    data.readMessages.messages &&
                    data.readMessages.messages[idx - 1].user.id !==
                      message.user.id ? (
                      <div className="flex space-x-2">
                        {message.user.id !== meData?.whoAmI.id && (
                          <Avatar size={"FRIEND"} />
                        )}
                        <div>
                          <div className="text-sm">{message.user.name} </div>
                          <div className="bg-white  px-1 rounded-sm shadow-sm mt-1">
                            {message.payload}
                          </div>
                        </div>
                      </div>
                    ) : idx !== 0 ? (
                      <div className="bg-white  px-1 rounded-sm shadow-sm ml-12">
                        {message.payload}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-end">
                    <div className="bg-yellow-300 px-1 rounded-sm shadow-sm">
                      {message.payload}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex w-[480px] fixed bottom-0 ">
              <textarea className="w-full h-28 resize-none" cols={5} />
              <button className="bg-yellow-300  text-sm w-12 h-7 absolute right-2 top-1">
                <span>전송</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChatDetail;
