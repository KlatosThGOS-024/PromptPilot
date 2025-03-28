import { useDispatch } from "react-redux";
import {
  addMessageLeft,
  addMessageRight,
  makeItFalse,
} from "../functions/messages/message";
import { getAIresponse } from "../api/AiApi";

export const Cards = ({ text, imgSrc }: { text: string; imgSrc: string }) => {
  const dispatch = useDispatch();

  return (
    <div className=" hover:scale-110 transition-all duration-150 ease-in-out">
      <button
        onClick={async () => {
          dispatch(makeItFalse());
          dispatch(addMessageRight(text));
          const response = await getAIresponse(text);
          dispatch(addMessageLeft(response));
        }}
        className=" shadow-xl rounded-xl space-y-4 bg-lightBlue2 p-4"
      >
        <img className="w-[316px] rounded-lg h-[316px]" src={imgSrc} />
        <h2 className="text-[20px] text-[#F1DCCB]">{text}</h2>
      </button>
    </div>
  );
};
