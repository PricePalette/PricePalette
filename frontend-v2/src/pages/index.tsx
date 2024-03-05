import {
  Button,
  Group,
  useMantineColorScheme,
  Image,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { Header } from "@/components/Header";
import { IconCheck } from "@tabler/icons-react";
import { Footer } from "@/components/Footer";
import classes from "../../../frontend-v2/src/styles/index.module.css";
import { useRouter } from "next/router";
import React from "react";

export default function IndexPage() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/getStarted");
  };

  const handleViewPlansClick = () => {
    router.push("/viewPlans");
  };
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <Header />
      <Group justify="center" mt="xl">
        <Button onClick={() => setColorScheme("light")}>Light</Button>
        <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        <Button onClick={() => setColorScheme("auto")}>Auto</Button>
      </Group>
      <br></br>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Craft{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: " #5ec5c3", to: "yellow" }}
              >
                pricing widgets
              </Text>{" "}
              for your Business success
            </Title>

            <Text className={classes.description} mt={30}>
              Easily enhance your website pricing strategy with customizable
              widget. Seamlessly embed your customized widgets
            </Text>
            <div className={classes.buttonsContainer}>
              <Button
                variant="gradient"
                gradient={{ from: "#5ec5c3", to: "yellow" }}
                size="lg"
                className={classes.control}
                mt={40}
                onClick={handleGetStartedClick}
              >
                Get started
              </Button>
              <div className={classes.buttonSpace} />
              <Button
                variant="gradient"
                gradient={{ from: "#5ec5c3", to: "yellow" }}
                size="lg"
                className={classes.control}
                mt={40}
                onClick={handleViewPlansClick}
              >
                View Plans
              </Button>
            </div>
          </div>
          <Image src="/dashboard.jpg" className={classes.image} />
        </div>
      </Container>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> Pricing Widget
              templates library
            </Title>
            <Text c="bright" mt="md">
              Build fully functional accessible pricing widgets faster to embed
              into your website
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Widget based</b> – Easily customize and create pricing
                packages tailored to your business needs.
              </List.Item>
              <List.Item>
                <b>Access to Templates</b> – Intuitive interface for quick and
                seamless pricing adjustments.
              </List.Item>
              <List.Item>
                <b>Get Code</b> – Seamless integration with your existing
                business systems and platforms.
              </List.Item>
            </List>
          </div>
          <Image src="/index2.png" className={classes.image} />
        </div>
      </Container>
      <Footer />
    </>
  );
}
