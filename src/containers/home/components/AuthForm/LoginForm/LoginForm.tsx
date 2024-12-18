import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion as m } from "motion/react";
import InputError from "../InputError/InputError";
import useCredentialLogin from "@/hooks/api/mutations/useCredentialLogin";

type LoginFormData = {
  identifier: string;
  password: string;
  remmember: boolean;
};

const LoginForm = () => {
  const { register, handleSubmit, getValues, formState } =
    useForm<LoginFormData>({
      values: {
        identifier: "",
        password: "",
        remmember: true,
      },
    });

  const { mutateAsync: login, isPending } = useCredentialLogin();
  const { errors } = formState;
  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          console.log("form data", data);
          login({
            identifier: data.identifier,
            password: data.password,
          })
            .then((res) => {
              console.log("credential login success", res.data);
            })
            .catch((e) => {
              console.log("credential login fail", e);
            });
        },
        (errors) => {
          console.log("invalide", errors);
        }
      )}
      className="mt-4 text-lg flex-col flex gap-2"
    >
      <div>
        <label htmlFor="signin-identifier" className="mb-0.5">
          Identifier
        </label>
        <input
          {...register("identifier", {
            required: {
              message: "* feild is required *",
              value: true,
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="signin-identifier"
          type="text"
          placeholder="email or username"
        />
        {errors.identifier?.message && (
          <InputError>{errors.identifier.message}</InputError>
        )}
      </div>

      <div>
        <label htmlFor="singin-pwd" className="mb-0.5">
          Password
        </label>
        <input
          {...register("password", {
            required: {
              message: "* feild is required *",
              value: true,
            },
            // minLength: {
            //   value: 20,
            //   message: "password should be 20 or more characters",
            // },

            validate: (val) => {
              return val === getValues("password") || "password don't match";
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="singin-pwd"
          type="password"
          placeholder="password"
        />
        {errors.password?.message && (
          <InputError>{errors.password.message}</InputError>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <input
            {...register("remmember")}
            type="checkbox"
            id="signin-remember"
          />
          <label htmlFor="signin-remember" className="ml-1">
            remember me?
          </label>
        </div>
        <div>
          <Link to={"/signup"} className="text-gray-500 hover:underline">
            dont have an account?
          </Link>
        </div>
      </div>
      <div>
        <m.button
          whileTap={{
            scale: 0.95,
            opacity: 0.8,
          }}
          className="bg-gray-700 mt-2 text-xl text-white px-2 py-1 rounded w-full hover:opacity-90"
          type="submit"
        >
          {isPending ? "Loading..." : "Login"}
        </m.button>
      </div>
    </form>
  );
};

export default LoginForm;
