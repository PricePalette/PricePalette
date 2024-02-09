import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Alchimetis
        </Typography>
        {/* TODO: Show the below  button on ly if the user is not authenticated */}

        <Button
          color="inherit"
          variant="outlined"
          style={{ marginRight: 8 }}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          style={{ marginRight: 4 }}
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
