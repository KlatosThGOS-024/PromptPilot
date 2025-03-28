import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAccount } from "../api/userApi";

export function InputTaker({
  label,
  placeholder,
  setInput,
  type = "text",
}: {
  label: string;
  placeholder: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
        {label}
      </label>
      <input
        type={type}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setInput(e.currentTarget.value);
        }}
        className="font-public_sans focus:border-[#7367F0] rounded-lg bg-[#2F3349] border-[1px] px-[12px] py-[10px] 
         border-[#D0CDE4] outline-none font-600 text-[16px] text-[#D0CDE4]"
        placeholder={placeholder}
      />
    </div>
  );
}

export const Loader = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7367F0]"></div>
  </div>
);

export const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !password || !firstName || !lastName || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        username,
        firstName,
        lastName,
        email,
        password,
      };

      const response = await createAccount(data);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.statusCode === 201) {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
      } else {
        const errorMessage = responseData.message || "Account creation failed";
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
            Sign Up
          </h2>
          <p className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
            Create your account
          </p>
        </div>
        <div className="space-y-[18px]">
          <div className="flex gap-[64px]">
            <InputTaker
              setInput={setFirstName}
              label="Firstname"
              placeholder="Enter your Firstname"
            />
            <InputTaker
              setInput={setLastName}
              label="Lastname"
              placeholder="Enter your Lastname"
            />
          </div>
          <InputTaker
            setInput={setUsername}
            label="Username"
            placeholder="Enter your username"
          />
          <InputTaker
            setInput={setEmail}
            label="Email"
            placeholder="Enter your email"
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
          onClick={handleSignUp}
          className="text-[18px] hover:opacity-90 inline-block w-full py-3
         rounded-lg font-public_sans bg-[#7367F0] text-[#D0CDE4]"
        >
          Sign Up
        </button>
        <div className="text-center">
          <p className="text-[#D0CDE4] mx-2 text-[18px]">
            Already have an account?{" "}
            <Link to={"/user/login"}>
              <span className="text-[#7367F0] hover:opacity-90">
                Sign in instead
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
