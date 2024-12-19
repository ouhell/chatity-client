import React from "react";
import { useForm } from "react-hook-form";
import InputError from "../InputError/InputError";
import useSignUp from "@/hooks/api/mutations/useSignUp";
import { Loader } from "lucide-react";

type Form = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

const SignUpForm = () => {
  const { mutateAsync: signup, isPending } = useSignUp();
  const { register, getValues, formState, handleSubmit } = useForm<Form>({
    values: {
      confirm: "",
      password: "",
      username: "",
      email: "",
    },
  });

  const errors = formState.errors;
  return (
    <form
      onSubmit={handleSubmit(
        (values) => {
          signup({
            username: values.username,
            email: values.email,
            password: values.password,
          });
        },
        () => {
          alert("fail!!");
        }
      )}
      className="mt-4 text-lg flex-col flex gap-2"
    >
      <div>
        <label htmlFor="signin-username" className="mb-0.5">
          Username
        </label>
        <input
          {...register("username", {
            required: {
              message: "* feild is required *",
              value: true,
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="signin-username"
          type="text"
          placeholder="username"
        />
        {errors.username?.message && (
          <InputError>{errors.username.message}</InputError>
        )}
      </div>

      <div>
        <label htmlFor="signin-email" className="mb-0.5">
          Email
        </label>
        <input
          {...register("email", {
            required: {
              message: "* feild is required *",
              value: true,
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="signin-email"
          type="email"
          placeholder="email"
        />
        {errors.email?.message && (
          <InputError>{errors.email.message}</InputError>
        )}
      </div>

      <div>
        <label htmlFor="signin-password" className="mb-0.5">
          Password
        </label>
        <input
          {...register("password", {
            required: {
              message: "* feild is required *",
              value: true,
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="signin-password"
          type="password"
          placeholder="password"
        />
        {errors.password?.message && (
          <InputError>{errors.password.message}</InputError>
        )}
      </div>

      <div>
        <label htmlFor="signin-confirm" className="mb-0.5">
          Confirm
        </label>
        <input
          {...register("confirm", {
            required: {
              message: "* feild is required *",
              value: true,
            },
            validate: (val) => {
              return getValues("password") === val
                ? true
                : "password does not match";
            },
          })}
          className="block focus:outline outline-1 outline-gray-600  rounded p-1 w-full border border-gray-200 hover:border-gray-400 transition-colors"
          id="signin-confirm"
          type="password"
          placeholder="confirm"
        />
        {errors.confirm?.message && (
          <InputError>{errors.confirm.message}</InputError>
        )}
      </div>
      <button
        type="submit"
        className="px-2 text-center py-1.5 rounded bg-slate-700 text-white mt-4 flex items-center gap-3"
      >
        <span>Sign Up</span>
        {isPending && (
          <span>
            <Loader className="size-4 animate-spin" />
          </span>
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
