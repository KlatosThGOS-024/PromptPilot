import { Input } from "../components/Input";
import { MessageBox } from "../components/MessageBox";

export const HomePage = () => {
  return (
    <section>
      <div
        className=" bg-lightBlue1 h-screen
       overflow-y-auto flex-grow flex-shrink px-[18px]"
      >
        <div className="mx-auto md:w-[744px] sm:min-w-[630px] ">
          <div>
            <MessageBox />
          </div>
          <div
            className="fixed bottom-0 md:w-[744px] sm:min-w-[630px] my-[24px]
           md:translate-x-[6px] min-w-[500px] 
         "
          >
            <Input />
          </div>
        </div>
      </div>
    </section>
  );
};
