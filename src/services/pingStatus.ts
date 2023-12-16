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
  axios.get("http://95.38.58.62:666/ping-status");
export const getTehranPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://95.38.58.62:555/ping-status");

export const getAlborzPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("http://2.189.59.168:666/ping-status");
export const getAlborzPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://2.189.59.168:555/ping-status");

export const getAhvazPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("http://2.189.59.146:666/ping-status");
export const getAhvazPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://2.189.59.146:555/ping-status");
