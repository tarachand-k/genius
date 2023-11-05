import { BiPlus, BiComment, BiTrashAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, deleteChat } from "@/lib/utils/request";

const Aside = ({ uid, clickHandler, chats = [] }) => {
  const queryClient = useQueryClient();

  // for create new chat
  const createMutation = useMutation({
    mutationFn: () => createChat(uid),
    onSuccess: () => {
      console.log("Crated New Chat");
      queryClient.invalidateQueries("chats");
    },
  });

  // for delete chat
  const deleteMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      console.log("Deleted chat");
      queryClient.invalidateQueries(["chats", "messages"]);
    },
  });

  const reversedChats = [...chats].reverse(true);

  return (
    <aside className="fixed left-0 w-80 h-screen bg-gray-900">
      <div className="relative h-full text-gray-50 flex flex-col items-center py-3 gap-5">
        <button
          onClick={() => createMutation.mutate()}
          className="border rounded-md border-gray-50 w-4/5 hover:bg-indigo-600 "
        >
          <div className="py-3 flex items-center justify-center">
            <BiPlus className="inline" size={22} />
            New Chat
          </div>
        </button>
        <div className="chat_list w-full flex flex-col gap-4 px-3">
          {reversedChats.map((chat, index) => (
            <div
              key={index}
              className="w-full border-0 rounded-md bg-gray-800 flex justify-center items-center"
            >
              <button
                className="text-left truncate w-full active:bg-violet-700"
                onClick={() => clickHandler(chat._id)}
              >
                <div className="py-3 text-gray-50">
                  <BiComment className="inline mx-4" size={20} />
                  {chat.name || "Chat"}
                </div>
              </button>
              <button
                onClick={() => deleteMutation.mutate(chat._id)}
                className="bg-gradient-to-l from-gray-800 py-4 px-3 hover:text-indigo-400"
              >
                <BiTrashAlt size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
