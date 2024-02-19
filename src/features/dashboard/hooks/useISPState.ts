import { useEffect, useState } from "react";
import api from "../../../services";
import { ReturnStateType } from "../../../services/pingStatus";
import { toast } from "react-toastify";

/**
 * The last index of the second in a minute.
 */
const LAST_SECOND_INDEX = 59;

/**
 * Interface representing the state of an ISP (Internet Service Provider).
 */
export interface ISPStateType {
  isActive: boolean;
  igw: string;
  igwAverage: number;
  igwColor: string;
  ipx: string;
  ipxAverage: number;
  ipxColor: string;
}

/**
 * Custom hook to fetch and manage ISP state data
 */
export const useISPState = () => {
  const [ISPStateData, setISPStateData] = useState<{
    ipxAverage: number;
    igwAverage: number;
    tehran: ISPStateType;
    alborz: ISPStateType;
    ahvaz: ISPStateType;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      // api.pingStatuses.getTehranPingState(),
      api.pingStatuses.getAlborzPingState(),
      api.pingStatuses.getAhvazPingState(),
    ])
      .then((data) => {
        const igwA =
          (getAverageOfLastMinute(data[0])[0] +
            getAverageOfLastMinute(data[1])[0]) /
          2;
        const ipxA =
          (getAverageOfLastMinute(data[0])[1] +
            getAverageOfLastMinute(data[1])[1]) /
          2;
        const convertedData = {
          igwAverage: igwA,
          ipxAverage: ipxA,
          tehran: {
            // isActive: Object.keys(data[0].data.IXP).every(
            //   (ip) => data[0].data.IXP[ip][0].last_1_min_avg !== null
            // ),
            isActive: true,
            igw: getPingStateForAllServers(0),
            igwAverage: 100,
            igwColor: getStateColor(0),
            ipx: getPingStateForAllServers(0),
            ipxAverage: 100,
            ipxColor: getStateColor(0),
          },
          alborz: {
            isActive:
              getNumberOfIssues(data[0]).reduce(
                (sum, issues) => (sum += issues)
              ) === 0,
            igw: getPingStateForAllServers(getNumberOfIssues(data[0])[0]),
            igwAverage: getAverageOfLastMinute(data[0])[0],
            igwColor: getStateColor(getNumberOfIssues(data[0])[0]),
            ipx: getPingStateForAllServers(getNumberOfIssues(data[0])[1]),
            ipxAverage: getAverageOfLastMinute(data[0])[1],
            ipxColor: getStateColor(getNumberOfIssues(data[0])[1]),
          },
          ahvaz: {
            isActive:
              getNumberOfIssues(data[1]).reduce(
                (sum, issues) => (sum += issues)
              ) === 0,
            igw: getPingStateForAllServers(getNumberOfIssues(data[1])[0]),
            igwAverage: getAverageOfLastMinute(data[1])[0],
            igwColor: getStateColor(getNumberOfIssues(data[1])[0]),
            ipx: getPingStateForAllServers(getNumberOfIssues(data[1])[1]),
            ipxAverage: getAverageOfLastMinute(data[1])[1],
            ipxColor: getStateColor(getNumberOfIssues(data[1])[1]),
          },
        };

        setISPStateData(convertedData);
      })
      .catch(() => {
        toast.error(
          "مشکلی در ارتباط با سرور ایجاد شده است. لطفا دقایقی دیگر تلاش کنید."
        );
      });
  }, []);

  return ISPStateData;
};

/**
 * Get the ping state for all servers based on the number of issues.
 * 
 * @param {number} numberOfIssues - The number of issues.
 * @returns {string} - The ping state.
 */
const getPingStateForAllServers = (numberOfIssues: number): string => {
  if (numberOfIssues === 0) return "مطلوب ";
  if (numberOfIssues <= 2) return "اختلالات جزئی";
  return "اختلالات کلی";
};

/**
 * Get the number of issues for each type (IGW and IXP).
 * 
 * @param {ReturnStateType} issueData - The issue data.
 * @returns {[number, number]} - An array containing the number of IGW and IXP issues.
 */
const getNumberOfIssues = (issueData: ReturnStateType) => {
  const numberOfIpxIssues = Object.keys(issueData.data.IXP).reduce(
    (issueSum, ip) =>
    (issueSum +=
      issueData.data.IXP[ip][LAST_SECOND_INDEX].last_1_min_avg === null
        ? 1
        : 0),
    0
  );

  const numberOfIGWIssues = Object.keys(issueData.data.IGW).reduce(
    (issueSum, ip) =>
    (issueSum +=
      issueData.data.IGW[ip][LAST_SECOND_INDEX].last_1_min_avg === null
        ? 1
        : 0),
    0
  );

  return [numberOfIGWIssues, numberOfIpxIssues];
};

/**
 * Get the color based on the value.
 * 
 * @param {number} value - The value.
 * @returns {string} - The color.
 */
export const getStateColor = (value: number): string => {
  if (value === 0) {
    return "#1CC760";
  } else if (value <= 2) {
    return "#FFF500";
  } else return "#FF6B6B";
};

/**
 * Get the average of the last minute for IGW and IXP.
 * 
 * @param {ReturnStateType} data - The state data.
 * @returns {[number, number]} - An array containing the average of IGW and IXP.
 */
export const getAverageOfLastMinute = (data: ReturnStateType): [number, number] => {
  let igwSum = 0;
  let igwCount = 0;
  for (let i = 0; i < Object.keys(data.data.IGW).length; i++) {
    const key = Object.keys(data.data.IGW)[i];
    for (let j = 0; j < 60; j++) {
      if (data.data.IGW[key][j].last_1_min_avg === null) {
        break;
      }
      igwCount++;
      igwSum += data.data.IGW[key][j].last_1_min_avg!;
    }
  }
  const igwAverage = Math.round(igwSum / igwCount);

  let ipxSum = 0;
  let ipxCount = 0;
  for (let i = 0; i < Object.keys(data.data.IXP).length; i++) {
    const key = Object.keys(data.data.IXP)[i];
    for (let j = 0; j < 60; j++) {
      if (data.data.IXP[key][j].last_1_min_avg === null) {
        break;
      }
      ipxCount++;
      ipxSum += data.data.IXP[key][j].last_1_min_avg!;
    }
  }

  const ipxAverage = Math.round(ipxSum / ipxCount);

  return [igwAverage, ipxAverage];
};
