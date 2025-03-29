import { Login } from "../components/Login";

export const LoginPage = () => {
  return (
    <section className="min-h-screen">
      <div className="bg-[#25293C] flex flex-col md:flex-row  min-h-screen">
        <div className="block lg:hidden pt-8 pb-4 text-center max-lg:hidden">
          <img
            className="w-24 h-24 mx-auto"
            src="images/3Dgirl.png"
            alt="Logo"
          />
        </div>

        <div className="lg:w-[70%] w-0 lg:block hidden px-auto my-16">
          <div className="w-fit mx-auto">
            <div>
              <img
                className="my-24 w-[600px]"
                src="../../public/images/3Dgirl.png"
                alt="3D Illustration"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] mx-auto flex-1">
          <Login />
        </div>
      </div>
    </section>
  );
};
