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
  Input,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Register as RegisterIllus } from "../illustrations/Register";

export default function Register() {
  const router = useRouter();

  return (
    <Flex style={{ height: "100vh" }} align={"center"} justify={"center"}>
      <RegisterIllus height={400} width={400} style={{ marginRight: "8em" }} />
      <Paper radius="md" p="xl" withBorder>
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

        <form>
          <Stack>
            <TextInput
              required
              label="Email"
              type="email"
              placeholder="hello@email.com"
              radius="md"
            />

            <TextInput
              required
              label="Username"
              placeholder="hellouser"
              radius="md"
            />

            <TextInput
              required
              label="Organization Name"
              placeholder="UWindsor"
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="********"
              radius="md"
            />

            <PasswordInput
              required
              label="Confirm Password"
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
