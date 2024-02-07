import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

const axios = new ClientApi();

interface Issue {
  status: string;
  isp: string;
  city: string;
  description: string;
}

export interface HistoryReturnType {
  count: number;
  issues: Issue[];
}

export const getAllHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history"
  );

export const getOpenHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history?status=open"
  );

export const getResolvedHistories = async (): Promise<
  AxiosReturnType<HistoryReturnType>
> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/history?status=resolved"
  );
