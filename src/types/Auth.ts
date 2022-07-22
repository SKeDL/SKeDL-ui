export type UserCredentials = {
  username: string;
  password: string;
};

export type TokenInfo = {
  AccessToken?: string;
  RefreshToken?: string;
  ExpireAt?: string;
};
