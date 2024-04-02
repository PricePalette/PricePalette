import { getUserAvatar } from "@/utils/getUserAvatar";
import { Paper, Avatar, Button, Text } from "@mantine/core";
import { IconDashboard, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export function UserInfoCard({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src={getUserAvatar(username)} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {email}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {username}
      </Text>

      <Button
        variant="filled"
        fullWidth
        mt="md"
        leftSection={<IconDashboard size={14} />}
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Dashboard
      </Button>

      <Button
        variant="filled"
        fullWidth
        mt="md"
        bg={"red"}
        leftSection={<IconLogout size={14} />}
        onClick={() => {
          localStorage.removeItem("pp_access_token");
          router.push("/");
          queryClient.removeQueries();
          ``;
        }}
      >
        Logout
      </Button>
    </Paper>
  );
}
