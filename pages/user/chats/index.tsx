import type { NextPage } from "next";
import Layout from "@components/Layout";
import { useQuery } from "@apollo/client";
import { readRooms } from "@libs/server/queries/__generated__/readRooms";
import { READ_ROOMS_QUERY } from "@libs/server/queries/readRooms.gql";
import LoadingSpiner from "@components/LoadingSpiner";
import Avatar from "@components/Avatar";
import Link from "next/link";

const Chats: NextPage = () => {
  const { loading, data } = useQuery<readRooms>(READ_ROOMS_QUERY);
  return (
    <Layout seoTitle="Chats">
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">채팅</h1>
          <div className="flex space-x-1 items-center">
            <div className="hover:bg-gray-100 relative p-2 rounded-full cursor-pointer">
              <div className="absolute -right-[1.5px] top-0  rounded-full font-semibold">
                +
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex py-20 justify-center items-center">
            <LoadingSpiner />
          </div>
        ) : (
          <div className="py-2 divide-x-2">
            {data?.readRooms.rooms?.map((room) => (
              <Link key={room.id} href={`/user/chats/${room.id}`}>
                <a>
                  <div className="flex space-x-4 items-center hover:bg-gray-100 py-2 px-2">
                    <div className="grid grid-cols-2 gap-1">
                      {room.users.slice(0, 4).map((user) => (
                        <div key={user.id}>
                          <Avatar size={"ROOM"} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {room.users.map((user) => user.name).join(", ")}
                      </span>
                      <span className="text-xs">
                        {room.messages
                          ?.map((message) => message.payload)
                          .join("")}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chats;
