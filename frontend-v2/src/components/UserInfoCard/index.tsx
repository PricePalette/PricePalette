import { getUserAvatar } from "@/utils/getUserAvatar";
import { Paper, Avatar, Button, Text } from "@mantine/core";

export function UserInfoCard({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src={getUserAvatar(username)} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {email}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {username}
      </Text>

      <Button variant="filled" fullWidth mt="md" bg={"red"}>
        Logout
      </Button>
    </Paper>
  );
}
