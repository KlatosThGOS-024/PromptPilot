import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessageRight, addMessageLeft } from "../functions/messages/message";
import getAIresponse from "../hooks/Ai";

function InputTaker({
  setUserMessage,
}: {
  setUserMessage: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full">
      <input
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
        placeholder="Message Cpoliot"
        className="w-full outline-none rounded-2xl
         bg-lightBlue3 placeholder:text-[#828BAC] px-[12px]
          text-white placeholder:px-[9px] py-[12px]"
      ></input>
    </div>
  );
}
export const Input = () => {
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(addMessageRight(userMessage));

    const response = await getAIresponse(userMessage);
    dispatch(addMessageLeft(response));
  };
  return (
    <div className="w-full rounded-3xl shadow-2xl bg-lightBlue2">
      <div
        className="flex sm:gap-[16px]  px-[14px] py-[8px]
       items-center "
      >
        <img
          className="md:w-[44px] w-[38px] hover:bg-lightBlue3 md:p-2 p-1
           lg:p-2 rounded-2xl"
          src="/icons/copilot-icon.svg"
        ></img>
        <img
          className="md:w-[44px] w-[38px] hover:bg-lightBlue3  md:p-2 p-1 lg:p-2  rounded-2xl"
          src="/icons/plus.svg"
        ></img>

        <InputTaker setUserMessage={setUserMessage} />
        <img
          className="md:w-[44px] w-[38px] hover:bg-lightBlue3  md:p-2 p-1 lg:p-2  rounded-2xl"
          src="/icons/mike.svg"
        ></img>
        <img
          className="md:w-[44px] w-[38px] cursor-pointer hover:bg-lightBlue3  md:p-2 p-2 -ml-2 lg:p-2  rounded-2xl"
          onClick={handleSubmit}
          src="/icons/send.png"
        ></img>
      </div>
    </div>
  );
};
