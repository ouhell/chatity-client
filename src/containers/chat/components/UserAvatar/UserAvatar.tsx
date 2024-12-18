import React from "react";

type Props = {
  username: string;
  img: string | undefined;
  size?: number;
};

const UserAvatar = ({ username, img, size = 2 }: Props) => {
  return (
    <div
      className="rounded-full grid place-items-center overflow-hidden  bg-slate-200 relative"
      style={{ width: size + "rem", height: size + "rem" }}
    >
      {!!img && (
        <img
          className="absolute top-0 left-0 right-0 bottom-0 "
          src={img}
          style={{ width: size + "rem", height: size + "rem" }}
        />
      )}

      <span className="capitalize ">{username[0]}</span>
    </div>
  );
};

export default UserAvatar;
