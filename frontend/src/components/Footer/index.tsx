import { Box, Typography, Link } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to right, #1192DD, black)`,
        color: "white",
        padding: "0.5rem",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2024 Price Palette, All rights reserved |
        <Link href="mailto:abc@pricepalette.com"> Contact Us </Link>
        <Link href="http://localhost:3000/faq"> | FAQ </Link>
        <Link href="http://localhost:3000/privacyPolicy">| Privacy Policy</Link>
        <Link href="http://localhost:3000/terms">| Terms & Conditions</Link>
      </Typography>
    </Box>
  );
}
