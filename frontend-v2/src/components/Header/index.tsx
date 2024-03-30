import { Group, Button, Box, Popover, Avatar } from "@mantine/core";
import classes from "../../styles/header.module.css";
import { Logo } from "@/illustrations/Logo";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import superagent from "superagent";
import { backendAPI } from "@/utils/constants";
import { UserInfoCard } from "../UserInfoCard";
import { getUserAvatar } from "@/utils/getUserAvatar";

export function Header() {
  const router = useRouter();
  let body = null;

  const { data } = useQuery({
    queryKey: ["UserQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/user/info`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content),
  });

  if (data) {
    body = (
      <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Avatar
            src={getUserAvatar(data.user_name)}
            size={40}
            radius={40}
            style={{ cursor: "pointer", marginRight: "0.5em" }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <UserInfoCard email={data.email} username={data.user_name} />
        </Popover.Dropdown>
      </Popover>
    );
  } else {
    body = (
      <Group visibleFrom="sm">
        <Button variant="default" onClick={() => router.push("/login")}>
          Log in
        </Button>
        <Button onClick={() => router.push("/register")}>Sign up</Button>
      </Group>
    );
  }

  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" align="center">
          <Logo
            height={50}
            width={140}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer", marginLeft: "0.5em" }}
          />

          {body}
        </Group>
      </header>
    </Box>
  );
}
