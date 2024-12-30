import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../api/userApi";

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

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOnclick = async () => {
    const data = {
      username,
      password,
    };

    const response = await logInUser(data);
    const responseData = await response;
    if (responseData.statusCode === 200) {
      localStorage.setItem("accessToken", responseData.data);
      navigate("/pilot");
    } else {
      console.error(responseData);
    }
  };
  return (
    <section className="flex justify-center flex-col h-full bg-[#2F3349]">
      <div className="px-[18px] py-[28px] space-y-[28px] mx-[48px]">
        <div>
          <h2 className="font-public_sans font-600 my-2 text-[28px] text-[#D0CDE4]">
            Login
          </h2>
          <p className="font-public_sans font-600 text-[18px] text-[#D0CDE4]">
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <div className=" space-y-[18px]">
          <InputTaker
            setInput={setUsername}
            label="Username"
            placeholder="Enter your username"
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
          Login
        </button>
        <div className=" text-center">
          <p className=" text-[#D0CDE4] text-[18px]">
            New on our platform?
            <Link to={"/user/signUp"}>
              <span className="text-[#7367F0] mx-2 hover:opacity-90">
                Create an account
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
