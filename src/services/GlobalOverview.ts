import { HistoryData } from "../pages/public/ISP";
import ClientApi from "./clientApi";

const axios = new ClientApi();

export const GetGlobalOverview = async (): Promise<HistoryData> =>
  await axios.http.get("/API/status");


