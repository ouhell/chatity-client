import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

const AuthForm = () => {
  const [newAcc, setNewAcc] = React.useState(false);

  return newAcc ? (
    <SignUpForm
      onSwitch={() => {
        setNewAcc(false);
      }}
    />
  ) : (
    <LoginForm
      onSwitch={() => {
        setNewAcc(true);
      }}
    />
  );
};

export default AuthForm;
