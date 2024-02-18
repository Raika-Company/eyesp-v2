import React, { useEffect, useState } from 'react';
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Detail, WebsiteData, Details } from '../../utils/types';
import CustomTooltipMessage from './CustomTooltipMessage';

/**
 * Extracts the time part from the first valid detail in the given details.
 * @param details - List of details
 * @returns Time part or "N/A" if no valid detail is found
 */

const getFirstValidTimeForHour = (details: Details) => {
    const validDetail = details.find(
        (detail: Detail) => detail.status === "200" || detail.status === "0"
    );
    if (validDetail) {
        const timeParts = validDetail.time.split("T");
        const timeOnly = timeParts[1]; // assuming the format is "YYYY-MM-DDTHH:MM:SS"
        return timeOnly;
    } else {
        return "N/A";
    }
};

/**
 * Computes the CSS style for the status line at the given index.
 * @param index - Current index
 * @param total - Total number of statuses
 * @returns CSS style object
 */

const statusLineStyle = (index: number, total: number) => {
    const displayInterval = Math.floor(total / 4);

    return {
        "&::before":
            index % displayInterval === 0 || index === total - 1
                ? {
                    content: '""',
                    display: "block",
                    width: "1px",
                    height: "25px",
                    backgroundColor: "#3f4145",
                    position: "absolute",
                    top: "-26%",
                    transform: "translateY(-50%)",
                    right: "-0.8px",
                }
                : {},
    };
};

/**
 * Props for the GridItem component.
 */
interface GridItemProps {
    data: WebsiteData;
}

const GridItem: React.FC<GridItemProps> = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:600px)");
    const isMiniMobile = useMediaQuery("(max-width:350px)");
    const isTablet = useMediaQuery(theme.breakpoints.between(600, 960));
    const [activeGraphMobile, setActiveGraphMobile] = useState<number | null>(null);
    const [activeGraphDesktop, setActiveGraphDesktop] = useState<number | null>(null);
    const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);
    const [currentActiveGraph, setCurrentActiveGraph] = useState<number | null>(null);

    /**
  * Handles the click event on the graph.
  * @param index - Index of the clicked graph
  */
    const handleGraphClick = (index: number) => {
        if (isMobile) {
            setCurrentActiveGraph(index);
            setActiveGraphMobile(index);

            if (tooltipTimer) clearTimeout(tooltipTimer);
            const newTimer = setTimeout(() => {
                setActiveGraphMobile(null);
            }, 1000); // 1 second
            setTooltipTimer(newTimer);
        }
    };

    /**
 * Handles the hover event on the graph.
 * @param index - Index of the hovered graph
 */
    const handleGraphHover = (index: number) => {
        if (!isMobile) {
            setActiveGraphDesktop(index);
        }
    };

    /**
 * Handles the leave event on the graph.
 */
    const handleGraphLeave = () => {
        if (!isMobile) {
            setActiveGraphDesktop(null);
        }
    };

    useEffect(() => {
        if (currentActiveGraph !== null) {
        }
    }, [currentActiveGraph]);

    useEffect(() => {
        return () => {
            if (tooltipTimer) clearTimeout(tooltipTimer);
        };
    }, [tooltipTimer]);

    const totalStatuses = data.hourly_status.slice(-24);
    const statusesCount = totalStatuses.length;
    const quarter = Math.floor(statusesCount / 4);
    const displayIndexes = [0, quarter, 2 * quarter, 3 * quarter, statusesCount - 1];

    return (
        <Grid
            xs={12}
            sx={{
                maxWidth: { md: "48%", lg: "31.9%" },
                borderRadius: "0.5rem",
                background: "#2B2E31",
                boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mx: "auto",
                my: "0.75em",
                px: "1.5em",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="0.5rem"
                sx={{ textTransform: "uppercase" }}
            >
                <img
                    src={`/images/${data.name}.svg`}
                    alt={data.name}
                    width={60}
                    height={60}
                />
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: isMiniMobile ? "0.37rem" : "0.8rem",
                    }}
                >
                    {data.name}
                </Typography>
            </Box>
            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="60%"
                mt="2em"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="flex-end"
                    width="100%"
                    height="100%"
                >
                    {data.hourly_status[0].details.map((statusDetail, index) => {
                        const bgColor =
                            statusDetail.color === "yellow"
                                ? "#C99143"
                                : statusDetail.color === "red"
                                    ? "#E93F3F"
                                    : "#7FCD9F";
                        return (
                            <Tooltip
                                title={
                                    <Typography>
                                        {CustomTooltipMessage([statusDetail], bgColor)}
                                    </Typography>
                                }
                                arrow
                                open={
                                    isMobile
                                        ? activeGraphMobile === index
                                        : activeGraphDesktop === index
                                }
                                onClick={() => handleGraphClick(index)}
                                onMouseEnter={() => handleGraphHover(index)}
                                onMouseLeave={handleGraphLeave}
                            >
                                <Box
                                    bgcolor={bgColor}
                                    sx={{
                                        width: "10px",
                                        height: "40px",
                                        cursor: "pointer",
                                        borderRadius: "2em",
                                        mx: "0.1em",
                                        "&:hover": {
                                            bgcolor: "#c3c3c3",
                                        },
                                        position: "relative",
                                        ...statusLineStyle(
                                            index,
                                            data.hourly_status[0].details.length
                                        ),
                                    }}
                                />
                            </Tooltip>
                        );
                    })}
                    <Typography
                        variant="subtitle1"
                        sx={{
                            transform: "rotate(-90deg)",
                            color: "#7A7775",
                            position: "absolute",
                            left: "-34px",
                            top: "-10px",
                        }}
                    >
                        Disorders
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    mt="0.5em"
                    // width="100%"
                    sx={{ width: isTablet ? "19rem" : "100%" }}
                >
                    {data.hourly_status.map((hourlyStatus, index) => {
                        const shouldDisplayHour = displayIndexes.includes(index);
                        return (
                            <Box
                                key={index}
                                sx={{
                                    width: shouldDisplayHour ? "auto" : "0px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                {shouldDisplayHour && (
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: "#7A7775",
                                            textAlign: "center",
                                            fontSize: isMiniMobile ? "0.23rem" : "0.6rem",
                                        }}
                                    >
                                        {getFirstValidTimeForHour(hourlyStatus.details)}
                                    </Typography>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Grid>
    );
}

export default GridItem