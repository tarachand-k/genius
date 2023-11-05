import Image from "next/image";

const Response = ({ answer }) => {
  return (
    <div className="grid grid-cols-12 py-4">
      <div className="flex items-center justify-center p-1 w-fit h-fit icon col-span-1 bg-[#10a37f] rounded-md">
        <Image src={"/img/gpt.png"} width={40} height={40} alt="user" />
      </div>
      <div className="answer col-span-11 px-4">
        {answer.split("\n").map((line, index) => (
          <p key={index} className="text-lg">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Response;
