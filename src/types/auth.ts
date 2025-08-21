export interface PostAuthTokenRequestParams {
  deviceId: string;
}

export interface PostAuthTokenResponse {
  token: string;
  expiresIn: number;
}

export type AuthTokenData = {
  token: string;
  expireDate: Date;
};
