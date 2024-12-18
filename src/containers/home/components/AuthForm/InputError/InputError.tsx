import React from "react";
import { motion as m } from "motion/react";

type Props = {
  children: React.ReactNode;
};
const InputError = ({ children }: Props) => {
  return (
    <m.div
      layout
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="text-red-700 text-sm overflow-hidden"
    >
      {children}
    </m.div>
  );
};

export default InputError;
