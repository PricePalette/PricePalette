import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { GoogleButton } from "../illustrations/Google";
import { useRouter } from "next/router";
import { Login as LoginIllus } from "../illustrations/Login";
import { useMutation, useQueryClient } from "react-query";
import superagent from "superagent";
import { SERVER_ERROR, SERVER_SUCCESS, backendAPI } from "@/utils/constants";
import { useFormik } from "formik";
import { toErrorMap } from "@/utils/toErrorMap";

export default function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginMutation.mutate(values);
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
    <Flex style={{ height: "100vh" }} align={"center"} justify={"center"}>
      <LoginIllus height={400} width={400} style={{ marginRight: "8em" }} />
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to PricePalette, Login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={formik.handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Email"
              name="email"
              placeholder="hello@email.com"
              radius="md"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                formik.touched.email && Boolean(formik.errors.email)
                  ? formik.errors.email
                  : null
              }
            />

            <PasswordInput
              required
              label="Password"
              name="password"
              placeholder="********"
              radius="md"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password && Boolean(formik.errors.password)
                  ? formik.errors.password
                  : null
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => router.push("/register")}
              size="xs"
            >
              {"Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
