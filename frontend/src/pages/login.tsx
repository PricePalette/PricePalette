import { Button, Stack, TextField, Typography } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setErrors }) => {
      setErrors({ email: "change", password: "yo" });
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Stack>
          </form>
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
                  const creds: any = jwtDecode(credentialResponse.credential!);
                  console.log(creds.email);
                  router.push({
                    pathname: "/confirm/[type]/[email]",
                    query: {
                      type: "login",
                      email: creds.email,
                    },
                  });
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
