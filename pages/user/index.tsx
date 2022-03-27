import { useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddFriendModal from "../../components/AddFriendModal";
import Avatar from "../../components/Avatar";
import Friend from "../../components/Friend";
import Layout from "../../components/Layout";
import LoadingSpiner from "../../components/LoadingSpiner";
import useUser from "../../libs/client/hooks/useUser";

import { CREATE_FRIENDS_MUTATION } from "../../libs/server/mutations/create-friends.gql";
import {
  createFriends,
  createFriendsVariables,
} from "../../libs/server/mutations/__generated__/createFriends";
import { SEARCH_FRIENDS_QUERY } from "../../libs/server/queries/searchFriends.gql";
import { SEE_FRIENDS_QUERY } from "../../libs/server/queries/seeFriends.gql";
import {
  searchFriends,
  searchFriendsVariables,
  searchFriends_searchFriends_users,
} from "../../libs/server/queries/__generated__/searchFriends";
import { seeFriends } from "../../libs/server/queries/__generated__/seeFriends";

export interface ISearchFriends {
  keyword: string;
}

const Index: NextPage = () => {
  const { data: whoAmIData, loading: whoAmILoading } = useUser();
  const { data: seeFeiendsData, loading: seeFriendsLoading } =
    useQuery<seeFriends>(SEE_FRIENDS_QUERY);

  const loading = whoAmILoading || seeFriendsLoading;

  const [addFriendModal, setAddFriendModal] = useState<boolean>(false);

  const { register, watch } = useForm<ISearchFriends>();
  const { data: searchFriendsData, loading: searchFriendsLoading } = useQuery<
    searchFriends,
    searchFriendsVariables
  >(SEARCH_FRIENDS_QUERY, {
    variables: {
      input: {
        keyword: watch("keyword"),
      },
    },
  });

  const keywordLen = watch("keyword")?.length || 0;

  const [showFriends, setShowFriends] = useState<boolean>(true);

  const [makeFriendList, setMakeFriendList] = useState<
    searchFriends_searchFriends_users[]
  >([]);

  const onClickFriendList = (user: searchFriends_searchFriends_users) => {
    if (user.id === whoAmIData?.whoAmI.id) return;
    setMakeFriendList((prev) => {
      if (prev.includes(user)) {
        return prev.filter((u) => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const [createFriendsMutate, { loading: createFriendsLoading }] = useMutation<
    createFriends,
    createFriendsVariables
  >(CREATE_FRIENDS_MUTATION, {
    refetchQueries: [SEE_FRIENDS_QUERY, "seeFriends"],
  });

  const onClicksCreateFriends = () => {
    if (createFriendsLoading || makeFriendList.length === 0) return;
    createFriendsMutate({
      variables: {
        input: {
          friendIds: makeFriendList.map((friend) => friend.id),
        },
      },
    });

    setAddFriendModal(() => false);
    setMakeFriendList(() => []);
  };

  const router = useRouter();

  const {
    query: { id: userId },
  } = router;

  return (
    <Layout seoTitle="Home">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="py-4">
          {addFriendModal && (
            <AddFriendModal
              setAddFriendModal={setAddFriendModal}
              register={register}
              keywordLen={keywordLen}
              searchFriendsLoading={searchFriendsLoading}
              onClickFriendList={onClickFriendList}
              users={searchFriendsData?.searchFriends.users}
              makeFriendList={makeFriendList}
              setMakeFriendList={setMakeFriendList}
              onClicksCreateFriends={onClicksCreateFriends}
              createFriendsLoading={createFriendsLoading}
            />
          )}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">친구</h1>
            <div className="flex space-x-1 items-center">
              <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div
                onClick={() => setAddFriendModal(true)}
                className="hover:bg-gray-100 p-2 rounded-full cursor-pointer"
              >
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="py-6 divide-y-[1px] divide-slate-300">
            {whoAmIData?.whoAmI && <Friend friend={whoAmIData?.whoAmI} me />}

            <div className="py-2">
              <div className="text-xs text-gray-400 font-medium py-1 flex justify-between items-center px-2">
                <div>친구 {seeFeiendsData?.seeFriends.friends?.length}</div>
                <div
                  className="text-base cursor-pointer"
                  onClick={() => setShowFriends((prev) => !prev)}
                >
                  {showFriends ? (
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
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {showFriends && (
                <div>
                  {seeFeiendsData?.seeFriends.friends?.map((friend) => (
                    <Friend key={friend.id} friend={friend} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {userId && (
            <div className="absolute bg-black/80 top-0 left-0 w-full h-full flex flex-col justify-end ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-400 hover:text-gray-500 absolute top-5 right-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => router.back()}
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="h-64 w-full  z-10 flex flex-col justify-evenly items-center mb-10">
                <div className="flex w-full justify-center pb-5 border-b-[0.5px]">
                  <Avatar size={"DETAIL"} />
                </div>
                <div className="flex justify-around space-x-10">
                  {userId !== whoAmIData?.whoAmI.id + "" && (
                    <div className="flex flex-col justify-center items-center space-y-2 hover:opacity-90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-white">채팅하기</span>
                    </div>
                  )}
                  {userId === whoAmIData?.whoAmI.id + "" && (
                    <div className="flex flex-col justify-center items-center space-y-2 hover:opacity-90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span className="text-xs text-white">프로필 관리</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
