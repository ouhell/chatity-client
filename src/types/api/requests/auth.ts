export type CredentialLoginRequest = {
  identifier: string;
  password: string;
};

export type CredentialSignUpRequest = {
  username: string;
  password: string;
  email: string;
};
