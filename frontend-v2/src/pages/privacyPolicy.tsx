import { TypographyStylesProvider, Text } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import classes from "../styles/Faq.module.css";

export default function privacyPolicy() {
  return (
    <>
      <Header />
      <Text component="div">
        <TypographyStylesProvider>
          <h2>Privacy Policy</h2>
          <p>
            PricePalette is committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, disclose, and protect your
            personal information.
          </p>
          <h3>Information We Collect</h3>
          <p>
            We may collect personal information such as your name, email
            address, and contact details when you interact with our website,
            products, or services.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use your personal information to communicate with you, process
            your requests, provide customer support, and improve our products
            and services.
          </p>
          <h3>Information Sharing</h3>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating our website, conducting our
            business, or servicing you.
          </p>
          <h3>Data Security</h3>
          <p>
            We implement security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h3>Your Choices</h3>
          <p>
            You can choose not to provide certain personal information, although
            it may limit your ability to use certain features of our website or
            services.
          </p>
          <h3>Changes to this Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at abc@pricepalette.ca
          </p>
        </TypographyStylesProvider>
      </Text>
      <Footer />
    </>
  );
}

