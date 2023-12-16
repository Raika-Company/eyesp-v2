import ClientApi from "../clientApi";
import config, { AxiosReturnType } from "../config";

const axios = new ClientApi();

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

interface InformationReturnType {
  download: Info[];
  ping: Info[];
}

export const getAllInfo = async (): Promise<
  AxiosReturnType<InformationReturnType>
> =>
  await axios.http.get(config.rootAddress + "/dashboard/get-issue-stats/info");

export const getInfoByCity = async (
  city = "Tehran"
): Promise<AxiosReturnType<InformationReturnType>> =>
  await axios.http.get(
    config.rootAddress + "/dashboard/get-issue-stats/info?city=" + city
  );

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
