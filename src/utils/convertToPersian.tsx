interface ProvinceInfo {
  name: string;
  x: number;
  y: number;
  size: number;
}

// This interface allows any string to index the object, returning a ProvinceInfo or undefined.
interface ProvincesCoords {
  [key: string]: ProvinceInfo;
}

// Assuming you've correctly imported provincesCoords with its actual structure
import provincesCoords from "../../public/data/provincesCoords.json";

interface ConflictKeys {
  [key: string]: string;
}

const conflictKeys: ConflictKeys = {
  download: "کاهش سرعت دانلود",
  upload: "کاهش سرعت آپلود",
  disconnect: "قطعی سرویس",
  packet_loss: "افزایش پکت لاس",
  ping: "پینگ",
};

const convertToPersian = (value: string): string => {
  const lowerCaseValue = value.toLowerCase();

  // Now TypeScript knows how to check the index access
  const province = provincesCoords[lowerCaseValue] as ProvinceInfo | undefined;
  if (province) return province.name;

  const conflictKey = conflictKeys[lowerCaseValue];
  if (conflictKey) return conflictKey;

  switch (lowerCaseValue) {
    case "hamraheaval":
      return "همراه اول";
    case "hiweb":
      return "های وب";
    case "irancell":
      return "ایرانسل";
    case "mobinnet":
      return "مبین نت";
    case "mokhaberat":
      return "مخابرات";
    case "samantel":
      return "سامان تل";
    case "shatel":
      return "شاتل";
    case "zitel":
      return "زی تل";
    default:
      return value;
  }
};

export default convertToPersian;
