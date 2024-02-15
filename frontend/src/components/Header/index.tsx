import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import theme from "../../theme";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static" sx={theme.appBarGradient}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          alt="Price Palette"
          src="/altlogo.png"
          onClick={() => router.push("/")}
        />
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
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          color="inherit"
          style={{
            borderRadius: 20,
            marginRight: 4,
          }}
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
