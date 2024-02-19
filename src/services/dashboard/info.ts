import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Interface representing information about an issue.
 */
interface Info {
  id: string;
  started_at: string;
  resolved_at: string;
  duration: string;
  city: string;
  isp: string;
  th: number;
  peak: number;
  low: number;
  log: {
    [key in string]: number;
  };
}

/**
 * Interface representing the return type of the information API.
 */
interface InformationReturnType {
  download: Info[];
  ping: Info[];
}

/**
 * Fetches all information about issues.
 * @returns {Promise<AxiosReturnType<InformationReturnType>>} - A promise with the information data.
 */
export const getAllInfo = async (): Promise<
  AxiosReturnType<InformationReturnType>
> =>
  await axios.http.get(config.rootAddress + "/dashboard/get-issue-stats/info");

/**
* Fetches information about issues in a specific city.
* @param {string} city - The name of the city.
* @returns {Promise<AxiosReturnType<InformationReturnType>>} - A promise with the information data for the specified city.
*/
export const getInfoByCity = async (
  city = "Tehran"
): Promise<AxiosReturnType<InformationReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/info?city=" + city
  );

/**
* Fetches information about issues for a specific ISP, city, and issue type.
* @param {string} isp - The name of the ISP.
* @param {string} city - The name of the city.
* @param {string} issue - The type of the issue (e.g., "download").
* @returns {Promise<AxiosReturnType<Partial<InformationReturnType>>>} - A promise with the information data for the specified ISP, city, and issue type.
*/
export const getInfoByISPaAndCityAndIssue = async (
  isp = "Irancell",
  city = "Tehran",
  issue = "download"
): Promise<AxiosReturnType<Partial<InformationReturnType>>> =>
  await axios.http.get(
    config.rootAddress +
    "/dashboard/get-issue-stats/info?isp=" +
    isp +
    "&city=" +
    city +
    "&issue=" +
    issue
  );
