import axios from "axios";
import config from "./config";

const { rootAddress } = config;

export const GetGlobalOverview = async () => {
  const response = await axios.get(rootAddress);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};
