import {
  getAhvazPingStatus,
  getAlborzPingStatus,
  getTehranPingStatus,
} from "../services/pingStatus";

export type ProvinceCoordsType = {
  [key: string]: {
    name: string;
    x: number;
    y: number;
    size: number;
  };
};

export const getProvinceData = async () => {
  const data = await Promise.all([
    getTehranPingStatus().then((res) => res.data),
    getAlborzPingStatus().then((res) => res.data),
    getAhvazPingStatus().then((res) => res.data),
  ]);

  return [
    {
      id: 1,
      name: "tehran",
      color: getColor(data[0].IXP.color, data[0].IGW.color),
      igw: getStatus(data[0].IGW.color),
      ipx: getStatus(data[0].IXP.color),
      igwColor: getStateColor(data[0].IGW.color),
      ipxColor: getStateColor(data[0].IXP.color),
    },
    {
      id: 2,
      name: "alborz",
      color: getColor(data[1].IXP.color, data[1].IGW.color),
      igw: getStatus(data[1].IGW.color),
      ipx: getStatus(data[1].IXP.color),
      igwColor: getStateColor(data[1].IGW.color),
      ipxColor: getStateColor(data[1].IXP.color),
    },
    {
      id: 3,
      name: "khozestan",
      color: getColor(data[2].IXP.color, data[2].IGW.color),
      igw: getStatus(data[2].IGW.color),
      ipx: getStatus(data[2].IXP.color),
      igwColor: getStateColor(data[2].IGW.color),
      ipxColor: getStateColor(data[2].IXP.color),
    },
  ];
};

export const mockProvinceListsForPrivate = {
  tehran: "#BD2626",
  qom: "#B68A19",
  isfahan: "#7FCD9F",
};

export const getColor = (ixp: string, igw: string): string => {
  if (ixp === "green" && igw === "green") {
    return "#1CC760";
  } else if (ixp === "yellow" || igw === "yellow") {
    return "#FFF500";
  } else if (ixp === "orange" || igw === "orange") {
    return "#FF6B6B";
  } else return "#1CC760";
};

export const getStateColor = (value: string): string => {
  if (value === "green") {
    return "#1CC760";
  } else if (value === "yellow") {
    return "#FFF500";
  } else if (value === "orange") {
    return "#FF6B6B";
  } else return "#1CC760";
};

export const getStatus = (color: string): string => {
  switch (color) {
    case "green":
      return "مطلوب";
    case "yellow":
      return "اختلالات جزيی";
    case "orange":
      return "اختلالات کلی";
    default:
      return "مطلوب";
  }
};
