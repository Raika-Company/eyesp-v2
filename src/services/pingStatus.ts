import axios from "axios";

interface ReturnStatusType {
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

interface ReturnStateType {
  data: {
    IGW: {
      [key in string]: {
        timestamp: string;
        last_1_min_avg: number | null;
        packet_loss_ratio: number;
      }[];
    };
    IXP: {
      [key in string]: {
        timestamp: string;
        last_1_min_avg: number | null;
        packet_loss_ratio: number;
      }[];
    };
  };
}
export const getTehranPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("/api-tehran");
export const getTehranPingState = async (): Promise<ReturnStateType> =>
  axios.get("/tehran-state");

export const getAlborzPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("/api-alborz");
export const getAlborzPingState = async (): Promise<ReturnStateType> =>
  axios.get("/alborz-state");

export const getAhvazPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("/api-ahvaz");
export const getAhvazPingState = async (): Promise<ReturnStateType> =>
  axios.get("/ahvaz-state");
