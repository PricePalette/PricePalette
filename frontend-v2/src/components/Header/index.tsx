import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/header.module.css";
import { Logo } from "@/Logo";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const theme = useMantineTheme();
  const handleLogin = () => {
    console.log("CLicked");
    router.push(`/login`);
  };
  const handleRegister = () => {
    router.push(`/register`);
  };
  const handleLogo = () => {
    router.push("/");
  };
  const { setColorScheme } = useMantineColorScheme();
  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Box>
            <Logo height={40} width={100} onClick={handleLogo} />
          </Box>
          <Group visibleFrom="sm">
            {/* Temporarile moving it here, could change in the final one after building the index page */}
            <Button onClick={() => setColorScheme("light")}>Light</Button>
            <Button onClick={() => setColorScheme("dark")}>Dark</Button>
            <Button variant="default" onClick={handleLogin}>
              Log in
            </Button>
            <Button onClick={handleRegister}>Sign up</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
