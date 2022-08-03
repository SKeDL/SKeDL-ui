export type UserCredentials = {
  username: string;
  password: string;
};

export type TokenInfo = {
  accessToken?: string;
  refreshToken?: string;
  expireAt?: number;
};

export type Session = {
  id: string;
  ip?: string;
  loggedOut?: boolean;
  loginData: TokenInfo;
};
