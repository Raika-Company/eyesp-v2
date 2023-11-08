import Header from "../../components/ui/Header";
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  styled,
} from "@mui/material";
import history from "../../assets/images/history.svg";
import CustomTable from "../../components/ui/CustomTable";
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "هوش مصنوعی"];

const LastDis = () => {
  return (
    <div>
      <Header
        title="اختلالات فعلی"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
        // onClick={toggleDialog}
      >
        <CustomTable cellHeaders={cellHeaders} isAI={true} />
      </Header>
    </div>
  );
};

export default LastDis;
