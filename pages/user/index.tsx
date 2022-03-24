import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Layout from "../../components/Layout";
import LoadingSpiner from "../../components/LoadingSpiner";
import { SEE_FRIENDS_QUERY } from "../../libs/server/queries/seeFriends.gql";
import { WHOAMI_QUERY } from "../../libs/server/queries/whoAmI.gql";
import { seeFriends } from "../../libs/server/queries/__generated__/seeFriends";
import { whoAmI } from "../../libs/server/queries/__generated__/whoAmI";

const Index: NextPage = () => {
  const { data: whoAmIData, loading: whoAmILoading } =
    useQuery<whoAmI>(WHOAMI_QUERY);
  const { data: seeFeiendsData, loading: seeFriendsLoading } =
    useQuery<seeFriends>(SEE_FRIENDS_QUERY);

  const loading = whoAmILoading || seeFriendsLoading;

  return (
    <Layout seoTitle="Home">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">친구</h1>
            <div className="flex space-x-4 items-center">
              <div>
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
              <div>
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
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 py-2 hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-blue-300 rounded-2xl flex justify-center items-center">
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
                    <span className="font-semibold text-sm">{friend.name}</span>
                  </div>
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
