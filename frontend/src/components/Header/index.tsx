import { AppBar, Button, Toolbar, Typography, Box, Link } from "@mui/material";
import React from "react";
import theme from "/src/theme.ts";

export default function Header() {
  return (
    <AppBar position="static" sx={theme.appBarGradient}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
              borderRadius: "50%",
            }}
            alt="Price Palette"
            src="/altlogo.png"
          />
        </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {/* TODO: Show the below  button on ly if the user is not authenticated */}
        <Button
          color="inherit"
          style={{
            borderRadius: 20,
            marginRight: 12,
            backgroundColor: "#1192DD",
          }}
        >
          Login
        </Button>
        <Button
          color="inherit"
          style={{
            borderRadius: 20,
            marginRight: 4,
          }}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
