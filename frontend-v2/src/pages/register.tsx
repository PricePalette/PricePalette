import { GoogleButton } from "@/illustrations/Google";
import {
  Flex,
  Paper,
  Group,
  Divider,
  Stack,
  TextInput,
  PasswordInput,
  Anchor,
  Button,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Register as RegisterIllus } from "../illustrations/Register";
import { useFormik } from "formik";
import { backendAPI, SERVER_ERROR, SERVER_SUCCESS } from "@/utils/constants";
import { toErrorMap } from "@/utils/toErrorMap";
import { useMutation, useQueryClient } from "react-query";
import superagent from "superagent";

export default function Register() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
        localStorage.setItem("stripe_cust_id", data.content.stripe_cust_id);
        localStorage.setItem("pp_access_token", data.access_token);
        queryClient.setQueryData(["UserQuery", { id: 1 }], data.content);
        router.push("/dashboard");
      }
    },
  });

  return (
    <Flex style={{ height: "100vh" }}>
      <Flex
        bg="myColor.7"
        h={"100vh"}
        w="50%"
        direction={"column"}
        align={"center"}
        justify={"center"}
      >
        <Title style={{ fontSize: "2.9rem" }} fw={900} c={"#edfcfa"}>
          Build a fully <span style={{ color: "#F9D00B" }}>functional</span>{" "}
          <br /> pricing widget today!
        </Title>
        <RegisterIllus height={350} width={350} />
      </Flex>
      <Flex h={"100vh"} w="50%" align={"center"} justify={"center"}>
        <Paper radius="md" p="xl" w={"50%"}>
          <Text size="lg" fw={500}>
            Welcome to PricePalette, Register with
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
                type="email"
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

              <TextInput
                required
                label="Username"
                name="username"
                placeholder="hellouser"
                radius="md"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                    ? formik.errors.username
                    : null
                }
              />

              <TextInput
                required
                label="Organization Name"
                name="orgName"
                placeholder="UWindsor"
                radius="md"
                value={formik.values.orgName}
                onChange={formik.handleChange}
                error={
                  formik.touched.orgName && Boolean(formik.errors.orgName)
                    ? formik.errors.orgName
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

              <PasswordInput
                required
                label="Confirm Password"
                name="confirmPassword"
                placeholder="********"
                radius="md"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                    ? formik.errors.confirmPassword
                    : null
                }
              />
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => router.push("/login")}
                size="xs"
              >
                {"Already have an account? Login"}
              </Anchor>
              <Button
                type="submit"
                radius="xl"
                loading={registerMutation.isLoading}
                loaderProps={{ type: "dots" }}
              >
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Flex>
  );
}
