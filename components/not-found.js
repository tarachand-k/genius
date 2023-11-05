const NotFound = () => {
  return (
    <div className="flex justify-center items-center pt-52">
      <div className="text-center title">
        <span className="text-sm text-gray-300">Oops...!</span>
        <h1 className="text-2xl text-gray-200 font-bold">No chat yet</h1>
        <p className="w-3/4 mx-auto py-5 text-gray-400">
          You don't have any chat yet. Click on <span>New chat</span> Button to
          create new chat and ask anything..! 😀 🙌
        </p>
      </div>
    </div>
  );
};

export default NotFound;
