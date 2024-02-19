import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

/**
 * Client API instance for making HTTP requests.
 */
const axios = new ClientApi();

/**
 * Type representing the ranking of ISPs.
 */
type ISPRankObject = {
  [key in string]: number;
};

/**
 * Type representing the return type of the ranking API.
 */
type RankingReturnType = ISPRankObject[];

/**
 * Fetches the ranking of ISPs.
 * @returns {Promise<AxiosReturnType<RankingReturnType>>} - A promise with the ranking data.
 */
export const getRanking = async (): Promise<
  AxiosReturnType<RankingReturnType>
> => await axios.http.get(config.rootAddress + "/dashboard/ranking");
