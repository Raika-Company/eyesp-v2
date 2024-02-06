import ClientApi from "./clientApi";
import config, { AxiosReturnType } from "./config";

const axios = new ClientApi();

export interface ChartReturnType {
  id: "string";
  data: {
    download: { name: string; value: number }[];
    upload: { name: string; value: number }[];
    ping: { name: string; value: number }[];
    packet_loss: { name: string; value: number }[];
    jitter: { name: string; value: number }[];
  };
}

export const getYearsChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/year?isp=${isp}&city=${city}`
  );

export const getMonthsChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/monthly?isp=${isp}&city=${city}`
  );

export const getweeksChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/weekly?isp=${isp}&city=${city}`
  );

export const getDaysChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/today?isp=${isp}&city=${city}`
  );
