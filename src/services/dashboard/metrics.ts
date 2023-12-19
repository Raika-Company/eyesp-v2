import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

const axios = new ClientApi();

interface ISPMetrics {
  downloadAverage: number;
  uploadAverage: number;
  speedAverage: number;
  pingAverage: number;
  packetLoss: number;
  jitter: number;
}

export interface MetricsReturnType {
  totalQualityAverage: number;
  clients: number;
  downloadAverage: number;
  uploadAverage: number;
  speedAverage: number;
  pingAverage: number;
  packetLossAverage: number;
  jitterAverage: number;
  isp: {
    [key in string]: ISPMetrics[];
  };
}

export const getAllMetrics = async (): Promise<
  AxiosReturnType<MetricsReturnType>
> => await axios.http.get(config.rootAddress + "/dashboard/metrics-stats");

export const getMetricsByISP = async (
  isp: string
): Promise<AxiosReturnType<MetricsReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/metrics-stats?isp=" + isp
  );

export const getMetricsByCity = async (
  city: string
): Promise<AxiosReturnType<MetricsReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/metrics-stats?city=" + city
  );
