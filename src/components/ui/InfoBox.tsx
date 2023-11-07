import {Box, Stack, Typography} from "@mui/material";
import {FC, ReactNode} from "react";
import ArrowLeft from "../../assets/images/arrow-left.svg";

interface Props {
  title: string;
  iconPath: string;
  children: ReactNode;
  hasButton?: boolean;
  onClick?: () => void;
}

const InfoBox: FC<Props> = ({
  title,
  iconPath,
  children,
  hasButton,
  onClick,
}) => {
  return (
    <Box
      sx={{
        flexGrow: "1",
        borderRadius: ".5rem",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        background: "#2B2E31",
        border: "1px solid #2B2E31",
        display: "flex",
        flexDirection: "column",
        minHeight: "12rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "#232629",
          borderTopRightRadius: ".5rem",
          borderTopLeftRadius: ".5rem",
          paddingY: ".6rem",
          paddingX: "1rem",
        }}
      >
        <Stack
          direction="row"
          sx={{
            flexGrow: "1",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <img
            src={iconPath}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
          <Typography>{title}</Typography>
        </Stack>
        {hasButton && (
          <img
            onClick={onClick}
            src={ArrowLeft}
            style={{
              marginLeft: ".5rem",
              cursor: "pointer",
            }}
          />
        )}
      </Box>
      {children}
    </Box>
  );
};

export default InfoBox;
