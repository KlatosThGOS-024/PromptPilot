import { useSelector } from "react-redux";
import { IRootState } from "../app/store/store";

export const ProfileMenu = () => {
  const userSelector = (state: IRootState) => {
    state.userReducer.userDetail?.fullName;
  };

  //   const {fullname,email}=userSelector.status.
  return <div></div>;
};
export const ProfileCircle = () => {
  const userSelector = useSelector((state: IRootState) => {
    return state.userReducer.userDetail;
  });

  return (
    <div className="">
      <div className="text-[28px] active:opacity-90 text-[#F2DDCC] bg-lightBlue2 py-2 rounded-full px-[21px] cursor-pointer border-[0.1px]">
        ProfileMenu
      </div>
    </div>
  );
};
