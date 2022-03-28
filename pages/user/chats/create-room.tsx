import { useMutation, useQuery } from "@apollo/client";
import Avatar from "@components/Avatar";
import Friend from "@components/Friend";
import Layout from "@components/Layout";
import LoadingSpiner from "@components/LoadingSpiner";
import { cls } from "@libs/client/utils";
import { CREATE_ROOM_MUTATION } from "@libs/server/mutations/create-room.gql";
import {
  createRoom,
  createRoomVariables,
} from "@libs/server/mutations/__generated__/createRoom";
import { SEE_FRIENDS_QUERY } from "@libs/server/queries/seeFriends.gql";
import {
  seeFriends,
  seeFriends_seeFriends_friends,
} from "@libs/server/queries/__generated__/seeFriends";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateRoom: NextPage = () => {
  const { data, loading } = useQuery<seeFriends>(SEE_FRIENDS_QUERY);
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  const [mutateCreateRoom, { loading: createRoomLoading }] = useMutation<
    createRoom,
    createRoomVariables
  >(CREATE_ROOM_MUTATION, {
    onCompleted: ({ createRoom: { ok, error, roomId } }) => {
      if (ok && roomId) {
        router.replace(`/user/chats/${roomId}`);
      } else if (error) {
        alert(error);
      }
    },
  });

  const onSubmit: SubmitHandler<any> = () => {
    const userIds = selectedUser.map((user) => user.id);
    mutateCreateRoom({
      variables: {
        input: {
          userIds,
        },
      },
    });
  };
  const selected = watch();
  const selectedStatus = Object.values(selected).includes(true);
  const [selectedUser, setSelectUser] = useState<
    seeFriends_seeFriends_friends[]
  >([]);

  return (
    <Layout seoTitle={"Create Room"} hasStatusBar={false}>
      <div className="py-4 relative">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Link href={"/user/chats"}>
              <a>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            </Link>
            <h1 className="text-base font-semibold">대화상대 초대</h1>
          </div>
        </div>
        <div className="py-2">
          {selectedUser.length > 0 && (
            <div>
              <div className="flex space-x-3 mt-2">
                {selectedUser.map((friend) => (
                  <div key={friend.id}>
                    <Avatar size={"ADD_FRIEND"} />
                    <div className="flex justify-center">
                      <span className="text-[6px] text-center">
                        {friend.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpiner />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="divide-y-[1px]">
                {data?.seeFriends.friends?.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex justify-between items-center px-2"
                  >
                    <Friend friend={friend} />
                    <input
                      type="checkbox"
                      {...register(`${friend.id}`)}
                      onClick={(event) => {
                        if (event.currentTarget.checked) {
                          setSelectUser((prev) => [...prev, friend]);
                        } else {
                          setSelectUser((prev) =>
                            prev.filter((i) => i.id !== friend.id)
                          );
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
              <button className="text-sm absolute top-4 right-0 flex items-center space-x-1">
                {!createRoomLoading && selectedStatus && (
                  <div className="w-5 h-5 text-sm flex justify-center items-center  bg-yellow-400  rounded-full">
                    {Object.values(selected).filter((e) => true === e).length}
                  </div>
                )}
                {createRoomLoading ? (
                  <LoadingSpiner />
                ) : (
                  <span
                    className={cls(
                      selectedStatus ? "text-black" : "text-gray-400"
                    )}
                  >
                    확인
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateRoom;
