import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Friend from "../../components/Friend";
import Layout from "../../components/Layout";
import LoadingSpiner from "../../components/LoadingSpiner";
import useUser from "../../libs/client/hooks/useUser";
import { SEARCH_FRIENDS_QUERY } from "../../libs/server/queries/searchFriends.gql";
import { SEE_FRIENDS_QUERY } from "../../libs/server/queries/seeFriends.gql";
import {
  searchFriends,
  searchFriendsVariables,
} from "../../libs/server/queries/__generated__/searchFriends";
import { seeFriends } from "../../libs/server/queries/__generated__/seeFriends";

interface ISearchFriends {
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

  return (
    <Layout seoTitle="Home">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="py-4">
          {addFriendModal && (
            <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex justify-center items-baseline">
              <div className="w-80 top-10 bg-white mt-20 px-2 z-10 shadow-lg rounded-sm">
                <div className="flex justify-end py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 hover:text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setAddFriendModal(false)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="p-2 pb-10">
                  <div className="text-lg mb-5">친구 추가</div>
                  <form className="flex items-center relative">
                    <input
                      {...register("keyword", {
                        required: true,
                        maxLength: 20,
                      })}
                      className="w-full border-black border-b-[1px] focus:outline-none"
                      autoComplete="off"
                      maxLength={20}
                    />
                    <div className="text-xs text-gray-500 absolute right-0">
                      {keywordLen} / 20
                    </div>
                  </form>
                  <div>
                    {searchFriendsLoading ? (
                      <div className="flex justify-center items-center pt-10">
                        <LoadingSpiner />
                      </div>
                    ) : (
                      <div className="mt-5">
                        {searchFriendsData?.searchFriends.users?.length ===
                        0 ? (
                          <div className="flex justify-center items-center">
                            <span className="text-sm text-gray-600">
                              No Result
                            </span>
                          </div>
                        ) : (
                          searchFriendsData?.searchFriends.users?.map(
                            (user) => <Friend key={user.id} friend={user} />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
            <div className="flex items-center space-x-3 py-2 hover:bg-gray-50">
              <div className="w-12 h-12 bg-blue-300 rounded-2xl flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-semibold text-sm">
                {whoAmIData?.whoAmI.name}
              </span>
            </div>
            <details className="py-2">
              <summary className="text-xs text-gray-400 font-medium py-1">
                친구 {seeFeiendsData?.seeFriends.friends?.length}
              </summary>
              <div>
                {seeFeiendsData?.seeFriends.friends?.map((friend) => (
                  <Friend key={friend.id} friend={friend} />
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
