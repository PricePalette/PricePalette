import { Button, Stack, TextField, Typography } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
          <Typography variant="subtitle2" gutterBottom>
            or
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <GoogleLogin
                width={"50000"}
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  console.log(jwtDecode(credentialResponse.credential!));
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
