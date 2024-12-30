import { em } from "framer-motion/client";
import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../api/userApi";

function InputTaker({
  label,
  placeholder,
  setInput,
}: {
  label: string;
  placeholder: string;
  setInput: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
        {label}
      </label>
      <input
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setInput(e.currentTarget.value);
        }}
        className="font-public_sans focus:border-[#7367F0] rounded-lg bg-[#2F3349] border-[1px] px-[12px] py-[10px] 
         border-[#D0CDE4] outline-none font-600 text-[16px] text-[#D0CDE4]"
        placeholder={placeholder}
      ></input>
    </div>
  );
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const handleOnclick = async () => {
    const data = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    const response = await createAccount(data);
    const responseData = await response.json();
    if (responseData.statusCode == 200) {
      navigate("/user/login");
    } else {
      console.error(responseData);
    }
  };
  return (
    <section className="flex justify-center flex-col h-full bg-[#2F3349]">
      <div className="px-[18px] py-[28px] space-y-[28px] mx-[48px]">
        <div>
          <h2 className="font-public_sans font-600 my-2 text-[28px] text-[#D0CDE4]">
            Sign Up
          </h2>
          <p className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
            Welcome back
          </p>
        </div>
        <div className=" space-y-[18px]">
          <div className=" flex gap-[64px] ">
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
          />
        </div>

        <span className=" inline-block text-[18px] text-[#D0CDE4]">
          I agree to{" "}
          <a className=" text-[#7367F0] opacity-80 cursor-pointer">
            privacy policy & terms
          </a>
        </span>

        <button
          onClick={handleOnclick}
          className="text-[18px] hover:opacity-90 inline-block w-full py-3
         rounded-lg font-public_sans bg-[#7367F0] text-[#D0CDE4]"
        >
          Sign Up
        </button>
        <div className=" text-center">
          <p className=" text-[#D0CDE4] mx-2 text-[18px]">
            Already have an account?{" "}
            <Link to={"/user/login"}>
              <span className="text-[#7367F0] hover:opacity-90">
                Sign in instead
              </span>
            </Link>
          </p>
        </div>
        {/* <div className="flex text-white flex-row">
          <hr></hr>
          <span>or</span>
          <hr></hr>
        </div> */}
      </div>
    </section>
  );
};
