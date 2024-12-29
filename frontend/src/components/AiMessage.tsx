export const AiResponse = ({ message }: { message: string }) => {
  return (
    <div className="space-y-3 ">
      <div className="flex w-full flex-col items-start ">
        <div
          className="h-fit max-w-[80%]  whitespace-pre-wrap 
            break-words rounded-2xl text-white bg-lightBlue2 px-5 py-3 text-base"
        >
          {message}
        </div>
      </div>
    </div>
  );
};
