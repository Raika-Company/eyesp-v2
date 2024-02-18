import ClientApi from "./clientApi";
import config, { AxiosReturnType } from "./config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Interface representing the return type of the chart API.
 */
export interface ChartReturnType {
  id: "string";
  data: {
    download?: { name: string; value: number }[] | undefined;
    upload?: { name: string; value: number }[] | undefined;
    ping?: { name: string; value: number }[] | undefined;
    packet_loss?: { name: string; value: number }[] | undefined;
    jitter?: { name: string; value: number }[] | undefined;
  };
}

/**
 * Fetches yearly chart data for a specific ISP and city.
 * @param {string} isp - The name of the ISP.
 * @param {string} city - The name of the city.
 * @returns {Promise<AxiosReturnType<ChartReturnType>>} - A promise with the yearly chart data for the specified ISP and city.
 */
export const getYearsChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/year?isp=${isp}&city=${city}`
  );

/**
* Fetches monthly chart data for a specific ISP and city.
* @param {string} isp - The name of the ISP.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<ChartReturnType>>} - A promise with the monthly chart data for the specified ISP and city.
*/
export const getMonthsChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/monthly?isp=${isp}&city=${city}`
  );

/**
* Fetches weekly chart data for a specific ISP and city.
* @param {string} isp - The name of the ISP.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<ChartReturnType>>} - A promise with the weekly chart data for the specified ISP and city.
*/
export const getweeksChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/weekly?isp=${isp}&city=${city}`
  );

/**
* Fetches daily chart data for a specific ISP and city.
* @param {string} isp - The name of the ISP.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<ChartReturnType>>} - A promise with the daily chart data for the specified ISP and city.
*/
export const getDaysChart = async (
  isp: string = "Irancell",
  city: string = "Tehran"
): Promise<AxiosReturnType<ChartReturnType>> =>
  await axios.http.get(
    config.rootAddress + `/dashboard/charts/today?isp=${isp}&city=${city}`
  );
