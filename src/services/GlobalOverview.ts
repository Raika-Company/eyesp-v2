import ClientApi from "./clientApi";

const axios = new ClientApi();

export const GetGlobalOverview = async () =>
  await axios.http.get("https://status.eyesp.live/get-history/lastminute");
