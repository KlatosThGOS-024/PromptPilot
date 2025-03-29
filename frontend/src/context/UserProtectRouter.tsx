import { SetStateAction, useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAccountDetail } from "../functions/messages/message";
import { Loader } from "../components/SignUp";

export const UserProtectRouter = () => {
  const [isLoggedIn, setIsloggedIn] =
    useState<SetStateAction<boolean | null>>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfileFunc = async () => {
      try {
        const response = await getUserProfile();
        if (response.ok) {
          const data = await response.json();
          const userProfile = data.data;
          if (data.statusCode === 200) {
            dispatch(userAccountDetail(userProfile));
            setIsloggedIn(true);
          } else {
            setIsloggedIn(false);
          }
        } else {
          setIsloggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsloggedIn(false);
      }
    };
    getUserProfileFunc();
  }, [dispatch]);

  if (isLoggedIn === null) {
    return <Loader />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/user/login"} />;
};
