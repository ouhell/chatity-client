import useGetSession from "@/hooks/api/queries/useGetSession";
import { SessionResp } from "@/types/api/responses/auth";
import React, { useContext } from "react";

type UserSessionContextData = SessionResp | undefined;

const UserSessionContext =
  React.createContext<UserSessionContextData>(undefined);

export const UserSessionProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const { data: userSession } = useGetSession();
  return (
    <UserSessionContext.Provider value={userSession}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useSession = (expected = false) => {
  const session = useContext(UserSessionContext);
  if (expected && (!session || !session.sessionUser))
    throw new Error("user is not logged");
  return session;
};
