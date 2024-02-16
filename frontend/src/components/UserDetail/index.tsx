import React from "react";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type User = {
  email: string;
  username: string;
};

export default function UserDetail({ email, username }: User) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "loggedin-user-detail" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} size="large">
        <AccountCircleIcon fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
          }}
        >
          <Typography sx={{ marginBottom: "0.5em" }}>
            Hello, <em style={{ fontWeight: "bold" }}>{username}</em>
          </Typography>

          <Typography sx={{ marginBottom: "0.5em" }}>{email}</Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem("pp_access_token");
              queryClient.clear();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </Popover>
    </div>
  );
}
