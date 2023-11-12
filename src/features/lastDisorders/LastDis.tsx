import Header from "../../components/ui/Header";
import { SelectChangeEvent } from "@mui/material/Select";
import history from "../../assets/images/history.svg";
import CustomTable from "../../components/ui/CustomTable";
import { useState } from "react";
import { Box, Theme, useMediaQuery } from "@mui/material";
import provinceCompare from "../../../public/data/provinceCompare.json";
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "هوش مصنوعی"];

const LastDis = () => {
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [category, setCategory] = useState("");
  const [rows, setRows] = useState(provinceCompare);
  console.log(rows);

  // const [visibleRows, setVisibleRows] = useState(6);
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

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
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box sx={{ width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%" }}>
          <CustomTable rows={rows} cellHeaders={cellHeaders} isAI={true} />
        </Box>
      </Box>
    </div>
  );
};

export default LastDis;
