import { Button, Stack, TextField, Typography } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} width="600px">
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            id="outlined-basic"
            label="Organization Name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="email" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
          <Button variant="contained">Register</Button>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
