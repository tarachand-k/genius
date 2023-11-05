import { useState } from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Aside from "@/components/aside";
import Main from "@/components/main";
import Search from "@/components/search";
import { getAllChats } from "@/lib/utils/request";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import NotFound from "@/components/not-found";
import { MdLogout } from "react-icons/md";

const Chat = ({ session }) => {
  const [chatId, setChatId] = useState(null);
  const {
    isLoading,
    isError,
    data: chats,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getAllChats(session.user.id),
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center">Error: {error.message}</div>;
  if (!chats) return <div className="text-center">No messages</div>;

  function onChatClick(chatId) {
    console.log(chatId);
    chats.filter((chat) => {
      if (chat._id === chatId) setChatId(chatId);
    });
  }

  return (
    <div className="w-full relative">
      <div className="hidden lg:block lg:w-80 bg-gray-900 aside z-10 text-gray-50">
        <Aside
          uid={session.user.id}
          clickHandler={onChatClick}
          chats={chats || null}
        ></Aside>
      </div>
      <div className="bg-gray-800 text-gray-50 min-h-screen pb-40 h-full lg:pl-80">
        {chatId ? <Main chatId={chatId}></Main> : <NotFound />}
        {/* {chatId && <Search chatId={chatId}></Search>} */}
      </div>
      <div className="fixed top-4 right-6 w-fit">
        <button
          onClick={() => signOut()}
          className="border rounded-md border-gray-50 text-gray-50 hover:bg-indigo-600"
        >
          <div className="p-2 pl-3 flex items-center justify-center gap-2">
            Logout <MdLogout />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Chat;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}
