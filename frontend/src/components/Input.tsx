import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessageRight, addMessageLeft } from "../functions/messages/message";
import { getAIresponse } from "../api/AiApi";

function InputTaker({
  setUserMessage,
}: {
  setUserMessage: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full">
      <textarea
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
        placeholder="Message Cpoliot"
        className="w-full outline-none rounded-lg sm:rounded-2xl
         bg-lightBlue3 placeholder:text-[#828BAC] px-2 sm:px-3 md:px-4
          text-white placeholder:px-2 py-2 sm:py-3 text-sm sm:text-base
          min-h-8 sm:min-h-10 max-h-32 resize-y"
      ></textarea>
    </div>
  );
}

export const Input = () => {
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!userMessage.trim()) return;
    dispatch(addMessageRight(userMessage));
    const response = await getAIresponse(userMessage);
    dispatch(addMessageLeft(response));
    setUserMessage("");
  };

  return (
    <div className="fixed bottom-4  left-2 right-2 sm:bottom-6 sm:left-4 sm:right-4 md:bottom-8 md:left-1/4 md:right-1/4 lg:left-1/6 lg:right-1/6">
      <div className="lg:w-[700px] max-sm:w-[380px] mx-auto max-md:w-[600px] rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl bg-lightBlue2">
        <div className="flex gap-1  sm:gap-2 md:gap-4 px-2 sm:px-3 md:px-4 py-2 sm:py-3 items-center">
          <button className="flex-shrink-0">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:bg-lightBlue3 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl md:rounded-2xl"
              src="/icons/copilot-icon.svg"
              alt="Copilot"
            />
          </button>

          <button className="flex-shrink-0 hidden xs:block">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:bg-lightBlue3 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl md:rounded-2xl"
              src="/icons/plus.svg"
              alt="Add"
            />
          </button>

          <div className="flex-grow ">
            <InputTaker setUserMessage={setUserMessage} />
          </div>

          <button className="flex-shrink-0 hidden sm:block">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:bg-lightBlue3 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl md:rounded-2xl"
              src="/icons/mike.svg"
              alt="Microphone"
            />
          </button>

          <button onClick={handleSubmit} className="flex-shrink-0">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:bg-lightBlue3 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl md:rounded-2xl"
              src="/icons/send.png"
              alt="Send"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
