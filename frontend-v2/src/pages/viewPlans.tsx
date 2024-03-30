import {
  Card,
  Text,
  Button,
  Group,
  Container,
  List,
  ListItem,
} from "@mantine/core";
import { plansData } from "../../mockdata";
import { IconCheck } from "@tabler/icons-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import classes from "../styles/viewplans.module.css";
import { backendAPI } from "@/utils/constants";
import { useRouter } from "next/router";

export default function ViewPlans() {
  const router = useRouter();

  const createSubscription = async (priceId: string) => {
    if (!localStorage.getItem("pp_access_token")) {
      router.push("/login");
      return;
    }

    console.log("PRICE", priceId);
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

      console.log("DATA", {
        subscriptionId: subscription_id,
        clientSecret: client_secret,
      });

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
          {plansData.map((eachPlan, index) => (
            <Card key={index} shadow="lg" radius="md" className={classes.card}>
              <Card.Section className={classes.cardSection}>
                <Text size="lg" fw={500}>
                  {eachPlan.title}
                </Text>
                <Text size="md" style={{ marginBottom: "10px" }}>
                  {eachPlan.subTitle}
                </Text>
                <Text fw={700} style={{ fontSize: 26, lineHeight: 1 }}>
                  {eachPlan.price}
                </Text>
              </Card.Section>

              <Group mt="md" mb="xs" style={{ alignItems: "flex-start" }}>
                <List style={{ marginTop: "8px" }}>
                  {eachPlan.features.map((eachFeature, index) => (
                    <ListItem
                      key={index}
                      icon={<IconCheck size={18} />}
                      style={{ marginBottom: "8px" }}
                    >
                      {eachFeature}
                    </ListItem>
                  ))}
                </List>
              </Group>

              {/* Handle On Click */}
              <Button
                color="#4C5897"
                radius="md"
                style={{ marginTop: "30px" }}
                onClick={() => createSubscription(eachPlan.id)}
              >
                Subscribe
              </Button>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
