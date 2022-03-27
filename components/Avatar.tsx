import { cls } from "../libs/client/utils";

interface IAvatar {
  size: "ME" | "FRIEND" | "ADD_FRIEND" | "DETAIL";
}

const Avatar: React.FC<IAvatar> = ({ size }) => {
  return (
    <div
      className={cls(
        `bg-blue-300 rounded-2xl flex justify-center items-center`,
        size === "ME"
          ? "w-12 h-12"
          : size === "FRIEND"
          ? "w-10 h-10"
          : size === "DETAIL"
          ? "w-20 h-20"
          : "w-8 h-8"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-300 h-6 w-6"
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
  );
};

export default Avatar;
