const config = {
  rootAddress: "/api/v1",
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
