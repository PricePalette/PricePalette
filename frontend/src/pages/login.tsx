import { Button, Stack, TextField, Typography } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
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
  );
}
