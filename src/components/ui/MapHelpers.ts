export type ProvinceCoordsType = {
  [key: string]: {
    name: string;
    x: number;
    y: number;
    size: number;
  };
};

export const mockProvinceData = [
  {
    id: 1,
    name: "tehran",
    numberOfIssues: 3,
  },
  {
    id: 2,
    name: "azerbaijan, east",
    numberOfIssues: 1,
  },
  {
    id: 3,
    name: "khorasan, razavi",
    numberOfIssues: 6,
  },
  {
    id: 4,
    name: "fars",
    numberOfIssues: 1,
  },
  {
    id: 5,
    name: "isfahan",
    numberOfIssues: 2,
  },
  {
    id: 6,
    name: "alborz",
    numberOfIssues: 2,
  },
  {
    id: 7,
    name: "khozestan",
    numberOfIssues: 1,
  },
];

export const mockProvinceListsForPrivate = {
  tehran: "#BD2626",
  qom: "#B68A19",
  isfahan: "#7FCD9F",
};

export const getColor = (value: number): string => {
  if (value <= 4) {
    return "#1CC760";
  } else if (value <= 9) {
    return "#FFF500";
  } else {
    return "#FF6B6B";
  }
};
