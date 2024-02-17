import { Box, Typography } from '@mui/material';
import { StatusDetail } from '../../utils/types';

const CustomTooltipMessage = (details: StatusDetail[], color: string) => {
    const detail = details[0];
    let icon;

    switch (detail.color) {
        case "yellow":
            icon = "⚠️ اختلال جزیی در اتصال";
            break;
        case "green":
            icon = "✅ اتصال بدون مشکل و سالم است";
            return (
                <Box
                    sx={{
                        color: color,
                        py: "0.7em",
                        px: "0.5em",
                    }}
                >
                    <Typography>{icon}</Typography>
                </Box>
            );
        case "red":
            icon = "❌ قطعی کامل سرور";
            break;
        default:
            icon =
                "🔍 در حال بررسی وضعیت - لطفاً صبر کنید تا اطلاعات بیشتری دریافت کنید";
            break;
    }

    return (
        <Box
            sx={{
                color: color,
                py: "0.7em",
                px: "0.5em",
            }}
        >
            {/* <Typography variant="h3" fontWeight={800} pb={1}>
          وضعیت: {detail.status}
        </Typography> */}
            <Typography>{icon}</Typography>
            {detail.color !== "green" && (
                <Box
                    sx={{
                        py: "0.7em",
                        px: "0.6em",
                        my: "0.4rem",
                        borderRadius: "0.3em",
                        background:
                            "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 70.56%)",
                    }}
                >
                    <Typography
                        sx={{
                            mt: "0.4rem",
                        }}
                    >
                        زمان‌ اختلال: {detail.time_range || "محاسبه نشده"}
                    </Typography>
                </Box>
            )}
            {detail.color !== "green" && (
                <Typography sx={{ px: "0.2em", color: "#fff" }} component="span">
                    {detail.messageFA}
                </Typography>
            )}
        </Box>
    );
}

export default CustomTooltipMessage