import { Typography, Container } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function PrivacyPolicy() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Container sx={{ marginTop: 2 }}>
          <Typography variant="h4">Privacy Policy</Typography>
          <br></br>
          <Typography variant="body1">
            PricePalette is committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, disclose, and protect your
            personal information.
          </Typography>
          <br></br>
          <Typography variant="h6">Information We Collect</Typography>
          <Typography variant="body1">
            We may collect personal information such as your name, email
            address, and contact details when you interact with our website,
            products, or services.
          </Typography>
          <br></br>
          <Typography variant="h6">How We Use Your Information</Typography>
          <Typography variant="body1">
            We use your personal information to communicate with you, process
            your requests, provide customer support, and improve our products
            and services.
          </Typography>
          <br></br>
          <Typography variant="h6">Information Sharing</Typography>
          <Typography variant="body1">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating our website, conducting our
            business, or servicing you.
          </Typography>
          <br></br>
          <Typography variant="h6">Data Security</Typography>
          <Typography variant="body1">
            We implement security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </Typography>
          <br></br>
          <Typography variant="h6">Your Choices</Typography>
          <Typography variant="body1">
            You can choose not to provide certain personal information, although
            it may limit your ability to use certain features of our website or
            services.
          </Typography>
          <br></br>
          <Typography variant="h6">Changes to this Policy</Typography>
          <Typography variant="body1">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </Typography>
          <br></br>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at abc@pricepalette.com
          </Typography>
          <br></br>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
