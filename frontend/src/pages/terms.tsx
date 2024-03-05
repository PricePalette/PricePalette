import { Typography, Container } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function Terms() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Container sx={{ marginTop: 2 }}>
          <Typography variant="h4">Terms and Conditions</Typography>
          <br></br>
          <Typography variant="h5">1. Acceptance of Terms</Typography>
          <Typography variant="body1">
            By accessing or using our products, services, or website, you agree
            to be bound by these terms and conditions.
          </Typography>
          <br></br>
          <Typography variant="h5">2. Payment and Pricing</Typography>
          <Typography variant="body1">
            Payment for our products and services is required in advance. Prices
            are subject to change without notice.
          </Typography>
          <br></br>
          <Typography variant="h5">3. Intellectual Property</Typography>
          <Typography variant="body1">
            All intellectual property rights related to our products, services,
            and website are owned by us or our licensors.
          </Typography>
          <br></br>
          <Typography variant="h5">
            4. Privacy We respect your privacy
          </Typography>
          <Typography variant="body1">
            Please refer to our privacy policy for information on how we
            collect, use, and protect your personal information.
          </Typography>
          <br></br>
          <Typography variant="h5">5. Limitation of Liability</Typography>
          <Typography variant="body1">
            We shall not be liable for any damages arising out of or in
            connection with the use of our products, services, or website.
          </Typography>
          <br></br>
          <Typography variant="h5">6. Governing Law</Typography>
          <Typography variant="body1">
            These terms and conditions shall be governed by the laws.
          </Typography>
          <br></br>
          <Typography variant="h5">7. Changes to Terms</Typography>
          <Typography variant="body1">
            We reserve the right to update or modify these terms and conditions
            at any time. Changes will be effective immediately upon posting.
            These terms and conditions shall be governed by the laws.
          </Typography>
          <br></br>
          <Typography variant="h5">8. Contact Information</Typography>
          <Typography variant="body1">
            If you have any questions or concerns about these terms and
            conditions, please contact us at abc@pricepalette.com.
          </Typography>
          <br></br>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
