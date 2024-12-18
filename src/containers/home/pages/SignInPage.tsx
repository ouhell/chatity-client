import GoogleOauthBtn from "@/containers/home/components/OauthButtons/GoogleOauthBtn";
import { Facebook, Github, Twitter } from "lucide-react";
import { motion as m } from "motion/react";

import AuthForm from "../components/AuthForm/AuthForm";

const SignInPage = () => {
  return (
    <main>
      <m.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
          },
        }}
        exit={{
          opacity: 0,
          y: 200,
          transition: {
            duration: 0.4,
          },
        }}
        className="mt-20   bg-white  rounded min-h-80 max-w-[30rem] mx-auto p-12 border border-gray-600 shadow"
      >
        <h3 className="text-center font-semibold text-4xl font-fun">SignIn</h3>
        <ul className="flex flex-wrap justify-center gap-2 p-1  mt-3 mx-8 rounded-3xl ">
          <m.li>
            <GoogleOauthBtn />
          </m.li>

          <button className="size-8 rounded-full border hover:scale-105  transition-all hover:border-gray-600 grid place-items-center ">
            <Facebook className="size-4 text-blue-800" />
          </button>
          <button className="size-8 rounded-full border hover:scale-105 transition-transform grid place-items-center ">
            <Github className="size-4 text-gray-700" />
          </button>

          <button className="size-8 rounded-full border hover:scale-105 transition-transform grid place-items-center ">
            <Twitter className="size-4 text-blue-500" />
          </button>
        </ul>

        <div className="flex gap-2 items-center mt-4 ">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <div className="shrink-0 text-xl -mt-2">or</div>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <div>
          <AuthForm />
        </div>
      </m.div>
    </main>
  );
};

export default SignInPage;
