const config = {
  rootAddress: "http://95.38.58.11:8000/api/v1",
  timeout: 25000,
  tokenName: "eyesp_dashboard_token",
  refreshTokenName: "",
  cid: "user-id",
};

export type AxiosReturnType<T> = {
  status: number;
  data: T;
  message: string;
};

export default config;
