import { useRouter } from "next/router";
import { seeFriends_seeFriends_friends } from "../libs/server/queries/__generated__/seeFriends";
import Avatar from "./Avatar";

interface IFriend {
  friend: seeFriends_seeFriends_friends;
  me?: boolean;
}

const Friend: React.FC<IFriend> = ({ friend, me = false }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/user?id=${friend.id}`)}
      className="flex items-center space-x-3 py-2 hover:bg-gray-50"
    >
      <Avatar size={me ? "ME" : "FRIEND"} avatar={friend.avatar} />
      <span className="font-semibold text-sm">{friend.name}</span>
    </div>
  );
};

export default Friend;
