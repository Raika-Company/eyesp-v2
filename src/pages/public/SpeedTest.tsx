import { Box, Typography, keyframes } from "@mui/material";
import { useState } from "react";

const pulse = keyframes`
  0% {
    color: transparent;
  }

  40% {
    color: #9193a8
  }

  50% {
    color: white;
  }

  100% {
    color: #9193a8
  }
`;

const SpeedTest = () => {
  const [hoverButton, setHoverButton] = useState<boolean>(false);
  const [startTest, setStartTest] = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#141526",
      }}
    >
      <Box
        onClick={() => setStartTest(true)}
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: "20",
          ":hover": {
            background: "#498dd615",
          },
          "::before": {
            padding: "3px",
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "8px",
            background: "linear-gradient(to bottom, cyan, #498dd6)",
            "-webkit-mask":
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "-webkit-mask-composite": "xor",
            maskComposite: "exclude",
          },

          animation: startTest ? "fadeOut 1s both" : "",
          "@keyframes fadeOut": {
            "0%": {
              opacity: 1,
            },

            "100%": {
              opacity: 0,
            },
          },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-40%)",
            zIndex: "1",
            fontSize: "3.5rem",
          }}
        >
          GO
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px #26c5dd solid",
            opacity: "0",
            animation: hoverButton ? "" : "startRing 3.5s 3.5s infinite linear",

            "@keyframes startRing": {
              "0%": {
                opacity: "0",
                transform: "scale(1)",
              },

              "12.5%": {
                opacity: "0",
                transform: "scale(.995)",
              },

              "16.66%": {
                opacity: "1",
              },

              "50%": {
                opacity: 0,
                transform: "scale(1.3)",
              },
            },
          }}
        />
      </Box>

      {startTest && (
        <Box
          sx={{
            width: "370px",
            height: "370px",
            borderRadius: "50%",
            border: "#232f4e 30px solid",

            background: "#232f4e",
            position: "absolute",
            zIndex: "5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            animation: "scaleOut .5s .8s both, fadeBorderBottom .3s 1.6s both",

            "@keyframes scaleOut": {
              "0%": {
                transform: "scale(.5)",
                opacity: "0",
              },

              "100%": {
                transform: "scale(1)",
                opacity: "1",
              },
            },
            "@keyframes fadeBorderBottom": {
              "0%": {
                borderBottomColor: "transparent",
              },

              "100%": {
                borderBlockEndColor: "#141526",
              },
            },

            "&::after": {
              content: '""',
              position: "absolute",
              height: "90px",
              width: "80%",
              bottom: "-30px",
              left: "50%",
              borderTopRightRadius: "50%",
              borderTopLeftRadius: "50%",
              background: "#141526",
              animation: "borderFadeIn .3s 1.3s both",
              "@keyframes borderFadeIn": {
                "0%": {
                  left: "50%",
                  width: "0",
                },

                "100%": {
                  left: "7%",
                  width: "86%",
                },
              },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "0",
              height: "0",
              background: "#141526",
              zIndex: "10",
              borderRadius: "50%",
              animation: "fadeInsideOut .3s 1s ease-in both",
              "@keyframes fadeInsideOut": {
                "0%": {
                  width: "0",
                  height: "0",
                },

                "100%": {
                  width: "100%",
                  height: "100%",
                },
              },
            }}
          />
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "3rem",
              bottom: "2.5rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 1.9s both`,
            }}
          >
            0
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "1rem",
              bottom: "6rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 2.1s both`,
            }}
          >
            1
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "1rem",
              bottom: "10rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 2.3s both`,
            }}
          >
            5
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "3.2rem",
              bottom: "14.5rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 2.5s both`,
            }}
          >
            10
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "9rem",
              bottom: "17rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 2.7s both`,
            }}
          >
            20
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "15rem",
              bottom: "14.5rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 2.9s both`,
            }}
          >
            30
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "17rem",
              bottom: "10rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 3.1s both`,
            }}
          >
            50
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "17rem",
              bottom: "6rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 3.3s both`,
            }}
          >
            75
          </Typography>
          <Typography
            sx={{
              zIndex: "20",
              position: "absolute",
              left: "14rem",
              bottom: "2.5rem",
              color: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              animation: `${pulse} .2s 3.5s both`,
            }}
          >
            100
          </Typography>

          <Box
            sx={{
              zIndex: "20",
              width: "22px",
              height: "120px",
              background:
                "linear-gradient(to bottom, #fff 0, #232f4e 80%, transparent 100%)",
              position: "absolute",
              top: "2.5rem",
              clipPath: "polygon(25% 0, 0 100%, 100% 100%, 75% 0)",
              transform: `rotate(${-134}deg)`,
              transformOrigin: "50% 100%",
              animation: "showUp .5s 2s both",

              "@keyframes showUp": {
                "0%": {
                  opacity: 0,
                },

                "100%": {
                  opacity: 1,
                },
              },
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};

export default SpeedTest;
