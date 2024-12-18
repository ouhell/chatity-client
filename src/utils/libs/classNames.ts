import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...val: ClassValue[]) => {
  return twMerge(clsx(val));
};
