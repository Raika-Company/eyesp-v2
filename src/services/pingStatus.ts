import axios from "axios";

interface ReturnType {
  data: {
    timestamp: string;
    IXP: {
      color: string;
    };
    IGW: {
      color: string;
    };
  };
}

export const getTehranPingStatus = async (): Promise<ReturnType> =>
  axios.get("/api-tehran");

export const getAlborzPingStatus = async (): Promise<ReturnType> =>
  axios.get("/api-alborz");

export const getAhvazPingStatus = async (): Promise<ReturnType> =>
  axios.get("api-ahvaz");
