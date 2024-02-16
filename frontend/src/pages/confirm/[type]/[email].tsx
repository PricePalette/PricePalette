import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { backendAPI, SERVER_ERROR, SERVER_SUCCESS } from "@/utils/constants";
import { toErrorMap } from "@/utils/toErrorMap";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import superagent from "superagent";

// This page is for confirming the login and register attributes when user uses Google Sign in
export default function ConfirmPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  let viewComponent = null;
  const email = String(router.query.email);
  const suggestUsername = email.substring(0, email?.indexOf("@"));

  const loginFormik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: "",
    },
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      orgName: "",
      email: (router.query.email as string) || "",
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

      registerMutation.mutate(values);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      const { email, password } = data;

      return superagent
        .post(`${backendAPI}/user/login`)
        .send({
          email,
          password,
        })
        .set("Accept", "application/json")
        .then((res) => res.body)
        .catch((error) => error.response.body);
    },
    onSuccess: (data) => {
      // error
      if (data.message === SERVER_ERROR) {
        loginFormik.setErrors(toErrorMap(data.errors));
      }

      // success
      if (data.message === SERVER_SUCCESS) {
        localStorage.setItem("pp_access_token", data.access_token);
        queryClient.setQueryData(["UserQuery", { id: 1 }], data.content);
        router.push("/dashboard");
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: {
      orgName: string;
      email: string;
      username: string;
      password: string;
    }) => {
      const { email, username, orgName, password } = data;

      return superagent
        .post(`${backendAPI}/user/register`)
        .send({
          email,
          password,
          username,
          org_name: orgName,
        })
        .set("Accept", "application/json")
        .then((res) => res.body)
        .catch((error) => error.response.body);
    },
    onSuccess: (data) => {
      // error
      if (data.message === SERVER_ERROR) {
        registerFormik.setErrors(toErrorMap(data.errors));
      }

      // success
      if (data.message === SERVER_SUCCESS) {
        localStorage.setItem("pp_access_token", data.access_token);
        queryClient.setQueryData(["UserQuery", { id: 1 }], data.content);
        router.push("/dashboard");
      }
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
