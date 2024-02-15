import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// This page is for confirming the login and register attributes when user uses Google Sign in
export default function ConfirmPage() {
  const router = useRouter();
  let viewComponent = null;
  const email = String(router.query.email);
  const suggestUsername = email.substring(0, email?.indexOf("@"));

  const loginFormik = useFormik({
    initialValues: { email: router.query.email, password: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      orgName: "",
      email: router.query.email,
      username: suggestUsername,
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { setErrors }) => {
      const { confirmPassword, password } = values;

      // passwords dont match
      if (confirmPassword !== password) {
        setErrors({
          password: "Passwords don't match",
          confirmPassword: "Passwords don't match",
        });
        return;
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  if (router.query.type === "login") {
    viewComponent = (
      <>
        <Typography variant="h5" gutterBottom>
          Welcome back, <em>{router.query.email}</em>
        </Typography>
        <form onSubmit={loginFormik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              disabled
              variant="outlined"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              error={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
              }
              helperText={loginFormik.touched.email && loginFormik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              error={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
              }
              helperText={
                loginFormik.touched.password && loginFormik.errors.password
              }
            />
            <Button variant="contained" type="submit">
              Confirm Login
            </Button>
          </Stack>
        </form>
      </>
    );
  }

  if (router.query.type === "register") {
    viewComponent = (
      <>
        <Typography variant="h5" gutterBottom>
          Confirm your registration
        </Typography>
        <form onSubmit={registerFormik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="orgName"
              name="orgName"
              label="Organization Name"
              variant="outlined"
              value={registerFormik.values.orgName}
              onChange={registerFormik.handleChange}
              error={
                registerFormik.touched.orgName &&
                Boolean(registerFormik.errors.orgName)
              }
              helperText={
                registerFormik.touched.orgName && registerFormik.errors.orgName
              }
            />
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={registerFormik.values.username}
              onChange={registerFormik.handleChange}
              error={
                registerFormik.touched.username &&
                Boolean(registerFormik.errors.username)
              }
              helperText={
                registerFormik.touched.username &&
                registerFormik.errors.username
              }
            />
            <TextField
              id="email"
              name="email"
              label="email"
              variant="outlined"
              type="email"
              disabled
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              error={
                registerFormik.touched.email &&
                Boolean(registerFormik.errors.email)
              }
              helperText={
                registerFormik.touched.email && registerFormik.errors.email
              }
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              error={
                registerFormik.touched.password &&
                Boolean(registerFormik.errors.password)
              }
              helperText={
                registerFormik.touched.password &&
                registerFormik.errors.password
              }
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={registerFormik.values.confirmPassword}
              onChange={registerFormik.handleChange}
              error={
                registerFormik.touched.confirmPassword &&
                Boolean(registerFormik.errors.confirmPassword)
              }
              helperText={
                registerFormik.touched.confirmPassword &&
                registerFormik.errors.confirmPassword
              }
            />
            <Button variant="contained" type="submit">
              Confirm Register
            </Button>
          </Stack>
        </form>
      </>
    );
  }

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
          {viewComponent}
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
