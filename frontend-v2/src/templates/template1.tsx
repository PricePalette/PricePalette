import { useMetaData } from "@/stores/useMetaData";
import { WidgetMetaData } from "@/types";
import { Text, Card, Flex, Title, Button, Tooltip } from "@mantine/core";
import { IconCheck, IconQuestionMark } from "@tabler/icons-react";
import { title } from "process";
import { v4 as uuidv4 } from "uuid";

// this is the metadata for this specific template
export const metaData: WidgetMetaData = {
  title: "Website hosting pricing table",
  price: {
    duration: "M",
    currency: "CAD",
  },
  description: "View our plans",
  themeColor: "#FF7801",
  font: {
    size: "m",
    family: "Arial",
    color: "#FFFFFF",
  },
  widgetId: "8a0d2edd-79d3-4628-a7fd-f22890930a95",
  updatedFields: [],
  cards: [
    {
      id: uuidv4(),
      title: "Basic",
      description: "Ideal for small businesses",
      features: [
        {
          text: "1 website",
        },
        {
          text: "20GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "5 email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 2.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 52%",
    },
    {
      id: uuidv4(),
      title: "Standard",
      description: "Perfect for a corporate website",
      features: [
        {
          text: "3 websites",
        },
        {
          text: "50GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "Unlimited email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 5.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 46%",
    },
    {
      id: uuidv4(),
      title: "Premium",
      description: "The best for high traffic websites",
      features: [
        {
          text: "Unlimited websites",
        },
        {
          text: "100GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "Unlimited email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 11.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 42%",
    },
  ],
};

function TemplateCard({
  card,
  billDuration,
}: {
  card: WidgetMetaData["cards"][0];
  billDuration: "Monthly" | "Yearly";
}) {
  return (
    <Card
      withBorder
      radius={"md"}
      mt={"2em"}
      style={{ height: "550px", width: "300px" }}
    >
      <Card.Section
        bg={"blue"}
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
          <Text fw={700} style={{ fontSize: "1.5rem" }}>
            {card.title}
          </Text>
          <span style={{ fontSize: "4rem" }}>${card.amount}</span>
          <span style={{ fontSize: "0.8rem" }}>{card.priceCaption}</span>
          <Text size="xl">Billed {billDuration}</Text>
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
              <Text size="sm" ml={"xs"}>
                {feature.text}
              </Text>
              {feature.hint ? (
                <Tooltip label={feature.hint}>
                  <IconQuestionMark
                    height={"15px"}
                    width={"15px"}
                    style={{
                      marginLeft: "1em",
                      border: "2px gray solid",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              ) : null}
            </Flex>
          ))}
        </Flex>

        <Button style={{ width: "100%" }}>{card.buttonText}</Button>
      </Flex>
    </Card>
  );
}

export function Template1() {
  const metaData = useMetaData((state) => state.metaData);
  console.log(metaData);

  return (
    <Flex direction={"column"}>
      <Flex direction={"column"} align={"center"}>
        <Title>{metaData?.title}</Title>
        <Text>{metaData?.description}</Text>
      </Flex>
      <Flex gap={"lg"}>
        {metaData?.cards.map((card, index) => {
          return (
            <TemplateCard
              key={index}
              card={card}
              billDuration={
                metaData.price.duration === "M" ? "Monthly" : "Yearly"
              }
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
