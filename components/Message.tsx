import { readMessages_readMessages_messages } from "@libs/server/queries/__generated__/readMessages";
import { useEffect } from "react";
import Avatar from "./Avatar";

interface IMessage {
  messages: readMessages_readMessages_messages[] | null | undefined;
  meId: number | null | undefined;
}

const Message: React.FC<IMessage> = ({ messages, meId }) => {
  return (
    <div>
      <div className="h-full px-2 pb-36 row-span-4 space-y-2">
        {messages?.map((message, idx) =>
          message.user.id !== meId ? (
            <div key={message.id} className="flex">
              {idx === 0 && (
                <div className="flex space-x-2">
                  <Avatar size={"FRIEND"} />
                  <div>
                    <div className="text-sm">{message.user.name} </div>
                    <div className="bg-white  px-1 rounded-sm shadow-sm mt-1">
                      {message.payload}
                    </div>
                  </div>
                </div>
              )}
              {idx !== 0 &&
              messages &&
              messages[idx - 1].user.id !== message.user.id ? (
                <div className="flex space-x-2">
                  {message.user.id !== meId && <Avatar size={"FRIEND"} />}
                  <div>
                    <div className="text-sm">{message.user.name} </div>
                    <div className="bg-white  px-1 rounded-sm shadow-sm mt-1">
                      {message.payload}
                    </div>
                  </div>
                </div>
              ) : idx !== 0 ? (
                <div className="bg-white  px-1 rounded-sm shadow-sm ml-12 max-w-sm">
                  {message.payload}
                </div>
              ) : null}
            </div>
          ) : (
            <div key={message.id} className="flex justify-end">
              <div className="bg-yellow-300 px-1 rounded-sm shadow-sm max-w-sm">
                {message.payload}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Message;
