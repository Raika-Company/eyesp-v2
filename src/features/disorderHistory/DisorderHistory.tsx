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

const DisorderHistory = () => {
  return (
    <div>
      <Header
        title="تاریخچه اختلالات"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
        // onClick={toggleDialog}
      >
        <CustomTable cellHeaders={cellHeaders} />
      </Header>
    </div>
  );
};

export default DisorderHistory;
