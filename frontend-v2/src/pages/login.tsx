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

export default function Login() {
  const router = useRouter();

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

        <form>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@email.com"
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="********"
              radius="md"
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
