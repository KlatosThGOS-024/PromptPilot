import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../api/userApi";
import { InputTaker, Loader } from "./SignUp";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        username,
        password,
      };

      const response = await logInUser(data);

      if (response.statusCode === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);

        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/pilot");
        }, 2000);
      } else {
        const errorMessage = response.message || "Login failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center flex-col h-full bg-[#2F3349]">
      {isLoading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="px-[18px] py-[28px] space-y-[28px] mx-[48px]">
        <div>
          <h2 className="font-public_sans font-600 my-2 text-[28px] text-[#D0CDE4]">
            Login
          </h2>
          <p className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <div className="space-y-[18px]">
          <InputTaker
            setInput={setUsername}
            label="Username"
            placeholder="Enter your username"
          />
          <InputTaker
            setInput={setPassword}
            label="Password"
            placeholder="**********"
            type="password"
          />
        </div>
        <span className="inline-block text-[18px] text-[#D0CDE4]">
          I agree to{" "}
          <a className="text-[#7367F0] opacity-80 cursor-pointer">
            privacy policy & terms
          </a>
        </span>
        <button
          onClick={handleLogin}
          className="text-[18px] hover:opacity-90 inline-block w-full py-3
         rounded-lg font-public_sans bg-[#7367F0] text-[#D0CDE4]"
        >
          Login
        </button>
        <div className="text-center">
          <p className="text-[#D0CDE4] text-[18px]">
            New on our platform?
            <Link to={"/user/signUp"}>
              <span className="text-[#7367F0] mx-2 hover:opacity-90">
                Create an account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
