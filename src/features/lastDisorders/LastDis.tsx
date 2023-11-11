import Header from "../../components/ui/Header";
import { SelectChangeEvent } from "@mui/material/Select";
import history from "../../assets/images/history.svg";
import CustomTable from "../../components/ui/CustomTable";
import { useState } from "react";
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "هوش مصنوعی"];

const LastDis = () => {
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [category, setCategory] = useState("");
  // const [visibleRows, setVisibleRows] = useState(6);

  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };
  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedISP(event.target.value as string);
  };

  return (
    <div>
      <Header
        title="اختلالات فعلی"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
        handleISPChange={handleISPChange}
        handleProvinceChange={handleProvinceChange}
        handleCategory={handleCategory}
        category={category}
        province={province}
        selectedISP={selectedISP}

        // onClick={toggleDialog}
      ></Header>
      {/* <CustomTable cellHeaders={cellHeaders} isAI={true} /> */}
    </div>
  );
};

export default LastDis;
