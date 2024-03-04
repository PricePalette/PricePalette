import { TypographyStylesProvider, Text } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import classes from "../styles/Faq.module.css";

export default function terms() {
  return (
    <>
      <Header />
      <Text component="div">
        <TypographyStylesProvider>
          <h2>Terms and Conditions</h2>
          <br></br>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using our products, services, or website, you agree
            to be bound by these terms and conditions.
          </p>
          <h3>2. Payment and Pricing</h3>
          <p>
            Payment for our products and services is required in advance. Prices
            are subject to change without notice.
          </p>
          <h3>3. Intellectual Property</h3>
          <p>
            All intellectual property rights related to our products, services,
            and website are owned by us or our licensors.
          </p>
          <h3>4. Privacy We respect your privacy</h3>
          <p>
            Please refer to our privacy policy for information on how we
            collect, use, and protect your personal information.
          </p>
          <h3>5. Limitation of Liability</h3>
          <p>
            We shall not be liable for any damages arising out of or in
            connection with the use of our products, services, or website.
          </p>
          <h3>6. Governing Law</h3>
          <p>These terms and conditions shall be governed by the laws.</p>
          <h3>7. Changes to Terms</h3>
          <p>
            We reserve the right to update or modify these terms and conditions
            at any time. Changes will be effective immediately upon posting.
            These terms and conditions shall be governed by the laws.
          </p>
          <h3>8. Contact Information</h3>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at abc@pricepalette.ca
          </p>
        </TypographyStylesProvider>
      </Text>
      <Footer />
    </>
  );
}
