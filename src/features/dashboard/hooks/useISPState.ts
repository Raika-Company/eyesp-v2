import { useEffect, useState } from "react";
import {
  getAhvazPingState,
  getAlborzPingState,
} from "../../../services/pingStatus";

export const useISPState = () => {
  const [ISPStateData, setISPStateData] = useState<
    { [key in string]: { isActive: boolean } } | null
  >(null);

  useEffect(() => {
    Promise.all([
      // getTehranPingState(),
      getAlborzPingState(),
      getAhvazPingState(),
    ]).then((data) => {
      const convertedData = {
        tehran: {
          // isActive:
          //   data[0].data[data[0].data.length - 1].last_1_min_avg !== null,
          isActive: true,
        },
        alborz: {
          isActive: Object.keys(data[0].data.IXP).every(
            (ip) => data[0].data.IXP[ip][0].last_1_min_avg !== null
          ),
        },
        ahvaz: {
          isActive: Object.keys(data[1].data.IXP).every(
            (ip) => data[1].data.IXP[ip][0].last_1_min_avg !== null
          ),
        },
      };

      setISPStateData(convertedData);
    });
  }, []);

  return ISPStateData;
};
