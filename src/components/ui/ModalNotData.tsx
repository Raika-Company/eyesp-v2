import { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface StatusDetail {
    time: string;
    status: string;
}

interface HourlyStatus {
    hour: string;
    details: StatusDetail[];
}

interface ServerStatus {
    name: string;
    url: string;
    date: string;
    hourly_status: HourlyStatus[];
}

interface ModalNotDataProps {
    serverStatusData: ServerStatus[];
}

const ModalNotData: React.FC<ModalNotDataProps> = ({ serverStatusData }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (serverStatusData && serverStatusData.length > 0) {
            setDataLoaded(true);
        } else {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [serverStatusData]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (showModal && !dataLoaded) {
        return (
            <Modal open={showModal}>
                <Box
                    sx={{
                        textAlign: "center",
                        bgcolor: "#2c2e32",
                        width: isSmScreen ? "22rem" : "27rem",
                        p: isSmScreen ? "1em" : "3em",
                        mx: "auto",
                        my: "20em",
                        borderRadius: ".5em",
                    }}
                >
                    <Typography sx={{ mb: "2em", fontSize: "0.9rem" }}>
                        متاسفانه در حال حاضر قادر به دریافت دیتا نمی باشیم, <br /> لطفا بعدا
                        امتحان کنید.
                    </Typography>
                    <Button
                        sx={{ bgcolor: "#4D765F" }}
                        onClick={() => {
                            window.location.reload();
                            handleCloseModal();
                        }}
                    >
                        بروزرسانی صفحه
                    </Button>
                    <Button
                        sx={{ bgcolor: "#4D765F", mr: "2em" }}
                        onClick={() => {
                            navigate("/");
                            handleCloseModal();
                        }}
                    >
                        رفتن به صفحه اصلی
                    </Button>
                </Box>
            </Modal>
        );
    }
}

export default ModalNotData;