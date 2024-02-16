import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; // Adjust the path accordingly
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { relative } from "path";
import { useRouter } from "next/router";
import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Margin, Padding } from "@mui/icons-material";

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/getStarted");
  };

  const handleViewPlansClick = () => {
    router.push("/viewPlans");
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Box
          sx={{
            marginTop: 2,
            background: `linear-gradient(to right, #145da0, black)`,
            color: "white",
            width: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={14} sm={6}>
              <Box sx={{ padding: 8 }}>
                <Typography variant="h3" gutterBottom>
                  Craft pricing widgets for your Business success
                </Typography>
                <br></br>
                <Typography variant="h5" gutterBottom>
                  Partner with Price Palette
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{
                    borderRadius: 20,
                    marginTop: 20,
                    marginRight: 10,
                  }}
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{
                    borderRadius: 20,
                    marginTop: 20,
                  }}
                  onClick={handleViewPlansClick}
                >
                  View Plans
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                component="img"
                src="/indeximg1.png"
                alt="Pricing Widget Image"
                sx={{
                  margin: 10,
                  width: "80%",
                  borderRadius: 20,
                  mixBlendMode: "exclusion",
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ background: "white", padding: 2 }}>
          <Marquee direction="left" speed={30}>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/hyundai.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/apple.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/Meta.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/McD.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/intel.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
            <div style={{ marginRight: "50px" }}>
              <Image
                src="/samplelogo.png"
                alt="This is the logo of the company"
                width={100}
                height={100}
              />
            </div>
          </Marquee>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Choose the template that works best for your business
          </Typography>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="/index2.png"
                  alt="Features of Price Palette"
                  sx={{ width: "80%", borderRadius: 20 }}
                ></Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{ textAlign: "left" }}>
                  Features Overview
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "left" }}>
                  - Easily customize and create pricing packages tailored to
                  your business needs.
                  <br /> - Intuitive interface for quick and seamless pricing
                  adjustments.
                  <br /> - Real-time analytics to track package performance and
                  optimize pricing strategies.
                  <br /> - Seamless integration with your existing business
                  systems and platforms.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
