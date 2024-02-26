import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/header.module.css";
import { Logo } from "@/Logo";
import { useRouter } from "next/router";


export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const handleLogin = () =>{
    console.log("CLicked")
    router.push(`/login`);
  }
  const handleRegister = () =>{
    router.push(`/register`);
  }

  return (
    <Box pb={80}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Box>
            <Logo height={40} width={100} />
          </Box>
          <Group visibleFrom="sm">
            <Button variant="default" onClick={handleLogin}>Log in</Button>
            <Button onClick={handleRegister}>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group justify="center" grow pb="xl" px="md">
          <Button variant="default" >Log in</Button>
          <Button >Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
