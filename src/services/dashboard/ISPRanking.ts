import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

const axios = new ClientApi();

type ISPRankObject = {
  [key in string]: number;
};

type RankingReturnType = ISPRankObject[];

export const getRanking = async (): Promise<
  AxiosReturnType<RankingReturnType>
> => await axios.http.get(config.rootAddress + "/dashboard/ranking");
