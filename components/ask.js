import Image from "next/image";

const Ask = ({ question }) => {
  return (
    <div className="grid grid-cols-12 bg-gray-700 rounded-md">
      <div className="flex items-center justify-center w-fit icon col-span-1 bg-indigo-500 rounded-md p-1">
        <Image src={"/img/user.png"} width={40} height={40} alt="user" />
      </div>
      <div className="question col-span-11 px-4 flex flex-col justify-center">
        <h2 className="text-lg">{question}</h2>
      </div>
    </div>
  );
};

export default Ask;
