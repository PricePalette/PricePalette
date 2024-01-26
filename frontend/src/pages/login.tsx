import { Button, Stack, TextField, Typography } from "@mui/material";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        border: "2px dashed red",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} width="600px">
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          label="Username/email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button variant="contained">Login</Button>
      </Stack>
    </div>
  );
}
