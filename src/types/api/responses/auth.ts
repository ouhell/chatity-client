export enum UserRole {
  ADMIN,
  BASIC,
}

export type SessionUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  picture_url?: string | null;
};

export type SessionResp = {
  logged: boolean;
  sessionUser?: SessionUser;
};
