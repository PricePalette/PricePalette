import {
  Card,
  Text,
  Button,
  Group,
  Container,
  List,
  ListItem,
  Flex,
  Title,
  Tooltip,
} from "@mantine/core";
import { plansData } from "../../mockdata";
import { IconCheck, IconQuestionMark } from "@tabler/icons-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import classes from "../styles/viewplans.module.css";
import { backendAPI } from "@/utils/constants";
import { useRouter } from "next/router";

export default function ViewPlans() {
  const router = useRouter();

  const appliedFontSize = "0.5rem";

  const createSubscription = async (priceId: string) => {
    console.log("PRICE ID", priceId);
    if (!localStorage.getItem("pp_access_token")) {
      router.push("/login");
      return;
    }

    const response = await fetch(`${backendAPI}/subscribe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pp_access_token")}`,
      },
      body: JSON.stringify({
        // To be set from local storage
        stripe_cust_id: localStorage.getItem("stripe_cust_id"),
        price_id: priceId,
      }),
    });

    const { message, content } = await response.json();
    if (message === "OK" && content) {
      const { subscription_id, client_secret } = content;

      router.push({
        pathname: "/checkout",
        query: { subscription_id, client_secret },
      });
    } else {
      console.error("Failed to create subscription");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Text className={classes.largeText}>
        {"Choose the plan that is right for you"}
      </Text>
      <Text className={classes.smallText}>
        {"Grow with ease, Scale your solutions, Pay as you progress"}
      </Text>

      <Container size="xs" className={classes.container}>
        <div className={classes.cardDiv}>
          {plansData?.cards.map((card, index) => {
            return (
              <Card
                withBorder
                radius={"md"}
                mt={"2em"}
                style={{ height: "550px", width: "300px" }}
              >
                <Card.Section
                  bg={`${plansData.themeColor}`}
                  p={"lg"}
                  style={{
                    height: "290px",
                    "border-radius": "0 0 30% 30% / 50px",
                  }}
                >
                  <Flex
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    style={{ height: "100%" }}
                  >
                    <Text
                      c={`${plansData.font.color}`}
                      fw={700}
                      style={{ fontSize: `calc(1.3rem + ${appliedFontSize})` }}
                    >
                      {card.title}
                    </Text>
                    <span
                      style={{
                        fontSize: `calc(3.5rem + ${appliedFontSize})`,
                        color: `${plansData.font.color}`,
                      }}
                    >
                      ${card.amount}
                    </span>
                    <span
                      style={{
                        fontSize: `calc(0.5rem + ${appliedFontSize})`,
                        color: `${plansData.font.color}`,
                      }}
                    >
                      {card.priceCaption}
                    </span>
                    <Text size="xl" c={`${plansData.font.color}`}>
                      Billed{" "}
                      {plansData.price.duration === "M" ? "monthly" : "yearly"}{" "}
                      <span
                        style={{
                          fontSize: `1rem`,
                          color: `${plansData.font.color}`,
                        }}
                      >
                        in {plansData.price.currency}
                      </span>
                    </Text>
                  </Flex>
                </Card.Section>

                <Flex
                  direction="column"
                  justify={"space-between"}
                  align={"center"}
                  style={{ height: "100%" }}
                >
                  <Flex
                    direction={"column"}
                    justify={"center"}
                    gap={"md"}
                    style={{ height: "100%" }}
                  >
                    {card.features.map((feature, index) => (
                      <Flex align={"center"} key={index}>
                        <IconCheck height={"18px"} width={"18px"} />
                        <Text
                          c={`${plansData.font.color}`}
                          style={{
                            fontSize: `calc(0.5rem + ${appliedFontSize})`,
                          }}
                          ml={"xs"}
                        >
                          {feature.text}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>

                  <Button
                    style={{ width: "100%" }}
                    bg={`${plansData.themeColor}`}
                    onClick={() => createSubscription(card.id)}
                  >
                    {card.buttonText}
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
