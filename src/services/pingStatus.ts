import axios from "axios";

/**
 * Represents the structure of the response data when retrieving ping status.
 */
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

/**
 * Represents the structure of the response data when retrieving ping state.
 */
export interface ReturnStateType {
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
/**
 * Fetches the ping status for Tehran.
 * @returns A promise containing the ping status data.
 */
export const getTehranPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("http://95.38.58.62:666/ping-status");
/**
* Fetches the ping state for Tehran.
* @returns A promise containing the ping state data.
*/
export const getTehranPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://95.38.58.62:555/ping-status");
/**
 * Fetches the ping status for Alborz.
 * @returns A promise containing the ping status data.
 */
export const getAlborzPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("http://2.189.59.168:666/ping-status");
/**
 * Fetches the ping state for Alborz.
 * @returns A promise containing the ping state data.
 */
export const getAlborzPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://2.189.59.168:555/ping-status");
/**
 * Fetches the ping status for Ahvaz.
 * @returns A promise containing the ping status data.
 */
export const getAhvazPingStatus = async (): Promise<ReturnStatusType> =>
  axios.get("http://2.189.59.146:666/ping-status");
/**
 * Fetches the ping state for Ahvaz.
 * @returns A promise containing the ping state data.
 */
export const getAhvazPingState = async (): Promise<ReturnStateType> =>
  axios.get("http://2.189.59.146:555/ping-status");
