import { useEffect, useState } from "react";
import api from "../../../services";
import { ReturnStateType } from "../../../services/pingStatus";

const LAST_SECOND_INDEX = 59;

export const useISPState = () => {
  const [ISPStateData, setISPStateData] = useState<
    | {
        [key in string]: {
          isActive: boolean;
          igw: string;
          ipx: string;
          igwColor: string;
          ipxColor: string;
        };
      }
    | null
  >(null);

  useEffect(() => {
    Promise.all([
      // api.pingStatuses.getTehranPingState(),
      api.pingStatuses.getAlborzPingState(),
      api.pingStatuses.getAhvazPingState(),
    ]).then((data) => {
      const convertedData = {
        tehran: {
          // isActive: Object.keys(data[0].data.IXP).every(
          //   (ip) => data[0].data.IXP[ip][0].last_1_min_avg !== null
          // ),
          isActive: true,
          igw: getPingStateForAllServers(0),
          igwColor: getStateColor(0),
          ipx: getPingStateForAllServers(0),
          ipxColor: getStateColor(0),
        },
        alborz: {
          isActive:
            getNumberOfIssues(data[0]).reduce(
              (sum, issues) => (sum += issues)
            ) === 0,
          igw: getPingStateForAllServers(getNumberOfIssues(data[0])[0]),
          igwColor: getStateColor(getNumberOfIssues(data[0])[0]),
          ipx: getPingStateForAllServers(getNumberOfIssues(data[0])[1]),
          ipxColor: getStateColor(getNumberOfIssues(data[0])[1]),
        },
        ahvaz: {
          isActive:
            getNumberOfIssues(data[1]).reduce(
              (sum, issues) => (sum += issues)
            ) === 0,
          igw: getPingStateForAllServers(getNumberOfIssues(data[1])[0]),
          igwColor: getStateColor(getNumberOfIssues(data[1])[0]),
          ipx: getPingStateForAllServers(getNumberOfIssues(data[1])[1]),
          ipxColor: getStateColor(getNumberOfIssues(data[1])[1]),
        },
      };

      setISPStateData(convertedData);
    });
  }, []);

  return ISPStateData;
};

const getPingStateForAllServers = (numberOfIssues: number) => {
  if (numberOfIssues === 0) return "مطلوب ";
  if (numberOfIssues <= 2) return "اختلالات جزئی";
  return "اختلالات کلی";
};

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

export const getStateColor = (value: number): string => {
  if (value === 0) {
    return "#1CC760";
  } else if (value <= 2) {
    return "#FFF500";
  } else return "#FF6B6B";
};
