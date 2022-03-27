import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";
import { searchFriends_searchFriends_users } from "../libs/server/queries/__generated__/searchFriends";
import { ISearchFriends } from "../pages/user";
import Avatar from "./Avatar";
import Friend from "./Friend";
import LoadingSpiner from "./LoadingSpiner";

interface IAddFriendModal {
  setAddFriendModal: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<ISearchFriends>;
  keywordLen: number;
  searchFriendsLoading: boolean;
  users: searchFriends_searchFriends_users[] | null | undefined;
  onClickFriendList: any;
  makeFriendList: searchFriends_searchFriends_users[];
  setMakeFriendList: Dispatch<
    SetStateAction<searchFriends_searchFriends_users[]>
  >;
  onClicksCreateFriends: any;
  createFriendsLoading: boolean;
}

const AddFriendModal: React.FC<IAddFriendModal> = ({
  setAddFriendModal,
  register,
  keywordLen,
  searchFriendsLoading,
  users,
  onClickFriendList,
  makeFriendList,
  setMakeFriendList,
  onClicksCreateFriends,
  createFriendsLoading,
}) => {
  return (
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
                {users?.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <span className="text-sm text-gray-600">No Result</span>
                  </div>
                ) : (
                  users?.map((user) => (
                    <div key={user.id} onClick={() => onClickFriendList(user)}>
                      <Friend friend={user} />
                    </div>
                  ))
                )}
                {makeFriendList.length > 0 && (
                  <div>
                    <div className="flex space-x-3 mt-2">
                      {makeFriendList.map((friend) => (
                        <div key={friend.id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 bg-gray-100 rounded-full  text-gray-500 hover:text-black"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={() =>
                              setMakeFriendList((prev) =>
                                prev.filter((u) => u.id !== friend.id)
                              )
                            }
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <Avatar size={"ADD_FRIEND"} />
                          <div className="flex justify-center">
                            <span className="text-[6px] text-center">
                              {friend.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <div
                        onClick={onClicksCreateFriends}
                        className="bg-yellow-400 flex justify-center items-center w-16 text-xs p-1 rounded-sm hover:bg-yellow-500 cursor-pointer"
                      >
                        {createFriendsLoading ? (
                          <div className="ml-4">
                            <LoadingSpiner />
                          </div>
                        ) : (
                          "친구 추가"
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
