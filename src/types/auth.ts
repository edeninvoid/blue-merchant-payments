export interface AuthTokenRequestParams {
  deviceId: string;
}

export interface AuthTokenResponse {
  token: string;
  expiresIn: number;
}

export type AuthTokenData = {
  token: string;
  expireDate: Date;
};
