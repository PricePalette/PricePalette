import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import theme from "../../theme";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import superagent from "superagent";
import { backendAPI } from "@/utils/constants";
import UserDetail from "../UserDetail";

export default function Header() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["UserQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/user/info`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content),
  });

  let body = null;

  if (data) {
    body = <UserDetail email={data.email} username={data.username} />;
  } else {
    body = (
      <>
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
      </>
    );
  }

  return (
    <AppBar position="static" sx={theme.appBarGradient}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          sx={{
              height: 40,
              width: "auto",
              /*borderRadius: "50%",*/
            }}
            alt="Price Palette"
            src="/logo-png.png"
          onClick={() => router.push("/")}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {body}
      </Toolbar>
    </AppBar>
  );
}
