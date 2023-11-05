import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Ask from "./ask";
import Response from "./response";
import { getMessages, sendMessage, updateChatName } from "@/lib/utils/request";
import Loader from "./loader";
import Banner from "./banner";
import { useState } from "react";
import { BiNavigation } from "react-icons/bi";

const Main = ({ chatId = "" }) => {
  const [prompt, setPrompt] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (args) => sendMessage(args),
    onSuccess: () => {
      console.log("Crated New Chat");
      queryClient.invalidateQueries("messages");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (args) => updateChatName(args),
    onSuccess: () => {
      console.log("updated chat name");
      queryClient.invalidateQueries("chats");
    },
  });

  const {
    isLoading,
    isError,
    data: messages,
    error,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
    onSuccess: () => {},
  });

  function onSubmit(e) {
    e.preventDefault();

    if (messages.length === 0 && prompt)
      updateMutation.mutate({ chatId, prompt });
    mutation.mutate({ chatId, prompt });
    setPrompt("");
  }

  // if (mutation.status === "pending")
  //   return <div className="text-center text-gray-50">Loading...</div>;

  // if (mutation.error)
  //   return (
  //     <div className="text-center text-gray-50">
  //       Error: {mutation.error.message}
  //     </div>
  //   );

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center">Error: {error.message}</div>;
  // if (messages.length === 0) return <Banner />;

  return (
    <>
      {chatId && messages.length !== 0 ? (
        <main className="container mx-auto w-4/5 lg:w-3/5 py-5">
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                {" "}
                <Ask question={message.question}></Ask>
                <Response answer={message.answer}></Response>
              </div>
            ))}
        </main>
      ) : (
        <Banner />
      )}
      {mutation.status === "pending" ? (
        <div className="text-center text-gray-50">Loading...</div>
      ) : (
        <div className="fixed bottom-0 left-0 w-full z-0 h-40 text-gray-50 bg-gradient-to-t from-gray-800">
          <div className="grid grid-cols-6 absolute bottom-10 w-full">
            <div className="col-start-1 lg:col-start-2 col-span-6 flex justify-center items-center w-full">
              <div className="w-4/5 lg:w-2/3 px-5 bg-gray-800 border border-gray-700 rounded-lg flex items-center">
                <form onSubmit={onSubmit} className="flex w-full shadow-2xl">
                  <input
                    type="text"
                    className="w-full py-3 bg-transparent focus:outline-none text-lg"
                    autoFocus="autofocus"
                    placeholder="What are you looking for?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button type="submit">
                    <BiNavigation className="text-2xl hover:text-[#10a37f]"></BiNavigation>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
