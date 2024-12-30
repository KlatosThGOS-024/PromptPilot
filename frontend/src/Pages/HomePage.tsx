import { Input } from "../components/Input";
import { MenuBar } from "../components/MenuBar";
import { MessageBox } from "../components/MessageBox";

export const HomePage = () => {
  return (
    <section>
      <div className="flex h-screen">
        <div className="absolute w-[20%] ">
          <MenuBar />
        </div>

        <div className="w-[80%] bg-lightBlue1 overflow-y-auto flex-grow flex-shrink px-[18px]">
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
      </div>
    </section>
  );
};
