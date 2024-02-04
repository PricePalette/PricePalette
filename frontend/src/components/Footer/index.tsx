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
        marginTop: "9rem",
      }}
    >
      <Typography variant="body2">
        © 2024 Price Palette, All rights reserved |
        <Link href="mailto:abc@pricepalette.com"> Contact Us</Link>
      </Typography>
    </Box>
  );
}
