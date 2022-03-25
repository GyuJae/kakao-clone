import { seeFriends_seeFriends_friends } from "../libs/server/queries/__generated__/seeFriends";

interface IFriend {
  friend: seeFriends_seeFriends_friends;
}

const Friend: React.FC<IFriend> = ({ friend }) => {
  return (
    <div className="flex items-center space-x-3 py-2 hover:bg-gray-50">
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
  );
};

export default Friend;
