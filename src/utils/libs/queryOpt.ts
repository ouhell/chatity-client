import { AxiosResponse } from "axios";

export const replaceQueryData = <T>(fn: (old: T) => T) => {
  return (old: AxiosResponse<T> | undefined) => {
    if (!old) return old;
    return { ...old, data: fn(old.data) };
  };
};
