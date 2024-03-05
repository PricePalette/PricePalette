import { Button, Stack, TextField, Typography } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_ERROR, SERVER_SUCCESS, backendAPI } from "@/utils/constants";
import superagent from "superagent";
import { toErrorMap } from "@/utils/toErrorMap";

export default function Register() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      orgName: "",
      email: "",
      username: "",
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
        formik.setErrors(toErrorMap(data.errors));
      }

      // success
      if (data.message === SERVER_SUCCESS) {
        localStorage.setItem("pp_access_token", data.access_token);
        queryClient.setQueryData(["UserQuery", { id: 1 }], data.content);
        router.push("/dashboard");
      }
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
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="orgName"
                name="orgName"
                label="Organization Name"
                variant="outlined"
                value={formik.values.orgName}
                onChange={formik.handleChange}
                error={formik.touched.orgName && Boolean(formik.errors.orgName)}
                helperText={formik.touched.orgName && formik.errors.orgName}
              />
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                id="email"
                name="email"
                label="email"
                variant="outlined"
                type="email"
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
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Button variant="contained" type="submit">
                Register
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
                      type: "register",
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
