import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Interface representing the return type of the state API.
 */
interface StateReturnType {
  issues: {
    count: number;
    names: string[];
    descriptions: string[];
  };
  isp: {
    count: number;
    names: string[];
  };
  cities: {
    count: number;
    names: string[];
  };
}

/**
 * Fetches all state data.
 * @returns {Promise<AxiosReturnType<StateReturnType>>} - A promise with the state data.
 */
export const getAllStates = async (): Promise<
  AxiosReturnType<StateReturnType>
> =>
  await axios.http.get(config.rootAddress + "/dashboard/get-issue-stats/stats");

/**
* Fetches state data for a specific ISP.
* @param {string} isp - The name of the ISP.
* @returns {Promise<AxiosReturnType<StateReturnType>>} - A promise with the state data for the specified ISP.
*/
export const getStatesByISP = async (
  isp = "Irancell"
): Promise<AxiosReturnType<StateReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/stats?isp=" + isp
  );

/**
* Fetches state data for a specific ISP and city.
* @param {string} isp - The name of the ISP.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<StateReturnType>>} - A promise with the state data for the specified ISP and city.
*/
export const getStatesByISPAndCity = async (
  isp = "Irancell",
  city = "Tehran"
): Promise<AxiosReturnType<StateReturnType>> =>
  await axios.http.get(
    config.rootAddress +
    "/dashboard/get-issue-stats/stats?isp=" +
    isp +
    "&city=" +
    city
  );

/**
* Fetches state data for a specific issue.
* @param {string} issue - The type of issue (e.g., "download").
* @returns {Promise<AxiosReturnType<StateReturnType>>} - A promise with the state data for the specified issue.
*/
export const getStatesByIssue = async (
  issue = "download"
): Promise<AxiosReturnType<StateReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/stats?issue=" + issue
  );
