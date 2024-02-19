import { Box, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import ArrowLeft from "../../assets/images/arrow-left.svg";

/**
 * Props interface for the InfoBox component.
 */
interface Props {
  title: string;
  iconPath: string;
  children: ReactNode;
  hasButton?: boolean;
  onClick?: () => void;
}

/**
 * Functional component representing an information box.
 * @param {Props} props - The props for the InfoBox component.
 * @returns {JSX.Element} - React JSX element representing the information box.
 */
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
        position: "relative",
        flexGrow: "1",
        borderRadius: ".5rem",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        background: "#2B2E31",
        border: "1px solid #2B2E31",
        display: "flex",
        flexDirection: "column",
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
          cursor: "pointer",
        }}
        onClick={onClick}
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
          <Typography whiteSpace="nowrap">{title}</Typography>
        </Stack>
        {hasButton && (
          <img
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
