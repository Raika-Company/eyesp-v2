import config from "./config";

const { rootAddress } = config;

export const GetGlobalOverview = async () => {
  const response = await fetch(rootAddress);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
