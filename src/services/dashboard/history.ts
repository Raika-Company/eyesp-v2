import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Interface representing an issue.
 */
interface Issue {
  status: string;
  isp: string;
  city: string;
  description: string;
}

/**
 * Interface representing the return type of the history API.
 */
export interface HistoryReturnType {
  count: number;
  issues: Issue[];
}

/**
 * Fetches all issue histories.
 * @returns {Promise<AxiosReturnType<HistoryReturnType>>} - A promise with the history data.
 */
export const getAllHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history"
  );

/**
* Fetches open issue histories.
* @returns {Promise<AxiosReturnType<HistoryReturnType>>} - A promise with the open history data.
*/
export const getOpenHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history?status=open"
  );

/**
* Fetches resolved issue histories.
* @returns {Promise<AxiosReturnType<HistoryReturnType>>} - A promise with the resolved history data.
*/
export const getResolvedHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history?status=resolved"
  );
