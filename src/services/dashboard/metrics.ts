import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Interface representing metrics for a specific ISP.
 */
interface ISPMetrics {
  downloadAverage: number;
  uploadAverage: number;
  speedAverage: number;
  pingAverage: number;
  packetLoss: number;
  jitter: number;
}

/**
 * Interface representing the return type of the metrics API.
 */
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

/**
 * Fetches all metrics data.
 * @returns {Promise<AxiosReturnType<MetricsReturnType>>} - A promise with the metrics data.
 */
export const getAllMetrics = async (): Promise<
  AxiosReturnType<MetricsReturnType>
> => await axios.http.get(config.rootAddress + "/dashboard/metrics-stats");

/**
 * Fetches metrics data for a specific ISP.
 * @param {string} isp - The name of the ISP.
 * @returns {Promise<AxiosReturnType<MetricsReturnType>>} - A promise with the metrics data for the specified ISP.
 */
export const getMetricsByISP = async (
  isp: string
): Promise<AxiosReturnType<MetricsReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/metrics-stats?isp=" + isp
  );

/**
* Fetches metrics data for a specific city.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<MetricsReturnType>>} - A promise with the metrics data for the specified city.
*/
export const getMetricsByCity = async (
  city: string
): Promise<AxiosReturnType<MetricsReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/metrics-stats?city=" + city
  );
