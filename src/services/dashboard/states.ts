import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

const axios = new ClientApi();

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

export const getAllStates = async (): Promise<
  AxiosReturnType<StateReturnType>
> =>
  await axios.http.get(config.rootAddress + "/dashboard/get-issue-stats/stats");

export const getStatesByISP = async (
  isp = "Irancell"
): Promise<AxiosReturnType<StateReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/stats?isp=" + isp
  );

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

export const getStatesByIssue = async (
  issue = "download"
): Promise<AxiosReturnType<StateReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/stats?issue=" + issue
  );
