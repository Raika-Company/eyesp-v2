const config = {
  rootAddress: "http://95.38.58.65/api/v1",
  timeout: 25000,
  tokenName: "eyesp_dashboard_token",
  refreshTokenName: "",
  cid: "user-id",
};

export type AxiosReturnType<T> = {
  statusCode: number;
  message: string;
  datas: T;
};

export default config;
