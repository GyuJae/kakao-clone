import type { NextPage } from "next";
import Layout from "@components/Layout";
import { useQuery } from "@apollo/client";
import { readRooms } from "@libs/server/queries/__generated__/readRooms";
import { READ_ROOMS_QUERY } from "@libs/server/queries/readRooms.gql";
import LoadingSpiner from "@components/LoadingSpiner";
import Avatar from "@components/Avatar";

const Chats: NextPage = () => {
  const { loading, data } = useQuery<readRooms>(READ_ROOMS_QUERY);
  return (
    <Layout seoTitle="Chats">
      {loading ? (
        <div className="flex py-20 justify-center items-center">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="py-2 divide-x-2">
          {data?.readRooms.rooms?.map((room) => (
            <div key={room.id} className="flex space-x-4 items-center">
              <div className="grid grid-cols-2 gap-1">
                {room.users.slice(0, 4).map((user) => (
                  <div key={user.id}>
                    <Avatar size={"ROOM"} />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-semibold text-sm">
                  {room.users.map((user) => user.name).join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Chats;
