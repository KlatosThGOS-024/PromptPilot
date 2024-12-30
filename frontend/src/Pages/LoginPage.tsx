import { Login } from "../components/Login";

export const LoginPage = () => {
  return (
    <section>
      <div className="bg-[#25293C] flex h-screen">
        <div className="lg:w-[70%] w-[0%] lg:block hidden px-auto my-[64px] ">
          <div className="w-fit mx-auto">
            <div>
              <img
                className=" my-[96px] w-[600px] "
                src="../../public/images/3Dgirl.png"
              ></img>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-[70%] mx-auto ">
          <Login />
        </div>
      </div>
    </section>
  );
};
