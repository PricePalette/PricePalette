import { AppBar, Toolbar, Typography, Button, Grid, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; // Adjust the path accordingly
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { relative } from "path";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/getStarted");
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
                  }}
                  onClick={handleGetStartedClick}
                >
                  Get Started
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
        {/*TO-DO : Need to add marquee or some content to show the existing clients */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
