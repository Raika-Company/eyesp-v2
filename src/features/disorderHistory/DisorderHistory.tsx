import Header from "../../components/ui/Header";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  styled,
} from "@mui/material";
import history from "../../assets/images/history.svg";
import CustomTable from "../../components/ui/CustomTable";
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];

const RowBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "1rem",
  paddingRight: "3rem",
  "& > *": {
    flex: 1,
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.5,
  },
  "& > *:nth-of-type(4)": {
    flex: 0.3,
  },
}));
const HorizontalLine = styled(Box)(() => ({
  margin: "0 auto",
  width: "400px",
  height: "2px",
  background:
    "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgb(255, 255, 255) 49.48%,rgba(255, 255, 255, 0) 100%)",
  opacity: "0.2",
}));
const DisorderHistory = () => {
  return (
    <div>
      <Header
        title="تاریخچه اختلالات"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
        // onClick={toggleDialog}
      ></Header>
      <CustomTable cellHeaders={cellHeaders} />
    </div>
  );
};

export default DisorderHistory;
