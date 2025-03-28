import { useSelector } from "react-redux";
import { IRootState } from "../app/store/store";
import { SetStateAction, useState } from "react";
import { logOutUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function Theme({
  setInput,
}: {
  setInput: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="bg-[#1C2238] -top-[58px] left-[46px] rounded-xl font-[600] 
    cursor-pointer text-[#DBC8BC] absolute
     overflow-x-hidden flex gap-3 items-center py-4 px-3 "
    >
      <svg
        onClick={() => setInput((e) => !e)}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5 -rotate-90"
      >
        <path d="M4.20889 10.7327C3.9232 11.0326 3.93475 11.5074 4.23467 11.7931C4.5346 12.0788 5.00933 12.0672 5.29502 11.7673L11.2495 5.516V20.25C11.2495 20.6642 11.5853 21 11.9995 21C12.4137 21 12.7495 20.6642 12.7495 20.25V5.51565L18.7043 11.7673C18.99 12.0672 19.4648 12.0788 19.7647 11.7931C20.0646 11.5074 20.0762 11.0326 19.7905 10.7327L12.7238 3.31379C12.5627 3.14474 12.3573 3.04477 12.1438 3.01386C12.0971 3.00477 12.0489 3 11.9995 3C11.9498 3 11.9012 3.00483 11.8543 3.01406C11.6412 3.04518 11.4363 3.14509 11.2756 3.31379L4.20889 10.7327Z"></path>
      </svg>

      <div className="flex gap-3 text-[#DBC8BC] ">
        <span>Day</span>
        <span>Night</span>
      </div>
    </div>
  );
}
// function Theme() {
//   return (
//     <div
//       className="bg-[#1C2238] right-[246px] top-0 rounded-xl font-[600]
//     space-y-2 my-1 px-7 cursor-pointer text-[#DBC8BC] absolute
//      py-[16px] overflow-x-hidden  "
//     >
//       <svg
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         xmlns="http://www.w3.org/2000/svg"
//         className="size-5 -rotate-90"
//       >
//         <path d="M4.20889 10.7327C3.9232 11.0326 3.93475 11.5074 4.23467 11.7931C4.5346 12.0788 5.00933 12.0672 5.29502 11.7673L11.2495 5.516V20.25C11.2495 20.6642 11.5853 21 11.9995 21C12.4137 21 12.7495 20.6642 12.7495 20.25V5.51565L18.7043 11.7673C18.99 12.0672 19.4648 12.0788 19.7647 11.7931C20.0646 11.5074 20.0762 11.0326 19.7905 10.7327L12.7238 3.31379C12.5627 3.14474 12.3573 3.04477 12.1438 3.01386C12.0971 3.00477 12.0489 3 11.9995 3C11.9498 3 11.9012 3.00483 11.8543 3.01406C11.6412 3.04518 11.4363 3.14509 11.2756 3.31379L4.20889 10.7327Z"></path>
//       </svg>
//       <div className="space-y-6">
//         <h2 className=" text-center text-[#707690] ">THEME</h2>
//         <div className="flex gap-3 text-[#DBC8BC] ">
//           <div className=" bg-[#505B7B] p-9 rounded-xl ">Day</div>
//           <div className=" bg-[#505B7B] p-9 rounded-xl ">Night</div>
//         </div>
//       </div>
//     </div>
//   );
// }

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    const response = await logOutUser();
    const data = await response.json();
    console.log(data);
    if (data.statusCode === 200) {
      navigate("/user/login");
    }
  };
  const [openNextPanel, setOpenNextPanel] = useState(false);
  const userSelector = useSelector((state: IRootState) => {
    return state.userReducer.userDetail;
  });

  return (
    <div
      className="flex font-[600] z-30 text-[16px] flex-col
     gap-[26px]  absolute right-0 bg-[#1C2238] rounded-xl my-1 py-4 px-[38px] text-[#F2DDCC]"
    >
      <div className="text-center bg-lightBlue2 py-5 rounded-xl px-6 flex items-center flex-col gap-3">
        <img src="/icons/copilot-icon.svg" width={28} />
        <p className="text-[#F2DDCC] leading-5">
          Talk Copilot with you wherever you go
        </p>
      </div>
      <div className=" flex flex-col">
        <span>{userSelector.fullName}</span>
        <span className=" text-[#737B9A]">{userSelector.email}</span>
      </div>
      <hr></hr>
      <div className=" flex flex-col gap-[14px]">
        <div>
          <div
            onClick={() => {
              setOpenNextPanel(!openNextPanel);
            }}
            className="flex cursor-pointer justify-between hover:bg-[#303549] px-3 py-2 rounded-xl"
          >
            <span>Theme</span>
            <span className=" text-[#737B9A]">Night</span>
          </div>
          {openNextPanel && <Theme setInput={setOpenNextPanel} />}
        </div>

        <div className="flex cursor-pointer justify-between hover:bg-[#303549] px-3 py-2 rounded-xl">
          <span>GetPro</span>
          <span className=" text-[#737B9A]">1 month free</span>
        </div>
        <div className="hover:bg-[#303549] cursor-pointer px-3 py-2 rounded-xl">
          <span>About</span>
        </div>
        <hr></hr>
        <button
          onClick={() => {
            signOut();
          }}
          className="hover:opacity-80 bg-[#3C445F] rounded-lg py-[8px]"
        >
          Sign out
        </button>
        <div
          className=" text-[#737B9A] space-x-3 text-center 
        cursor-pointer "
        >
          <a className="hover:border-b-2">Privacy</a>
          <a className="hover:border-b-2">Terms</a>
          <a className="hover:border-b-2">FAQ</a>
        </div>
      </div>
    </div>
  );
};
export const ProfileCircle = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const userSelector = useSelector((state: IRootState) => {
    return state.userReducer.userDetail;
  });
  return (
    <div>
      <div
        onClick={() => {
          setOpenPanel(!openPanel);
        }}
        className="text-[28px] active:opacity-90 text-[#F2DDCC] bg-lightBlue2 py-2 rounded-full px-[21px] cursor-pointer border-[0.1px]"
      >
        {userSelector.fullName[0]}
      </div>
      <div>{openPanel && <ProfileMenu />}</div>
    </div>
  );
};
