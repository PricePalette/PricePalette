/* 
This is the component that is bundled for embeding in user websites
*/

import * as React from "react";
import ReactDOM from "react-dom/client";
import { Logo } from "@/illustrations/Logo";
import { WidgetMetaData } from "@/types";
import { backendAPI, fontSizeMap } from "@/utils/constants";
import {
  Text,
  Card,
  Flex,
  Title,
  Button,
  Tooltip,
  Loader,
  MantineProvider,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";
import { IconCheck, IconQuestionMark } from "@tabler/icons-react";
import { useQuery } from "react-query";
import superagent from "superagent";
import { QueryClient, QueryClientProvider } from "react-query";
import "@mantine/core/styles.css";

function TemplateCard({
  card,
  billDuration,
  metaData,
  templateName,
}: {
  card: WidgetMetaData["cards"][0];
  billDuration: "Monthly" | "Yearly";
  metaData: WidgetMetaData;
  templateName: "CurvedCard" | "SectionCard" | "LeafShaped";
}) {
  const currentFontSize = metaData.font?.size || "M";
  const appliedFontSize = fontSizeMap[currentFontSize];
  return (
    <Card
      withBorder
      radius={"md"}
      mt={"2em"}
      style={
        templateName == "LeafShaped"
          ? {
              height: "550px",
              width: "300px",
              "border-radius": "30% 0% 0% 0% / 50px",
            }
          : { height: "550px", width: "300px" }
      }
    >
      <Card.Section
        bg={`${metaData.themeColor}`}
        p={"lg"}
        style={{
          height: "290px",
          "border-radius":
            templateName === "LeafShaped"
              ? "30% 00% 30% 00% / 50px"
              : templateName === "SectionCard"
              ? "0 0 0 0 / 50px"
              : "0 0 30% 30% / 50px",
        }}
      >
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          style={{ height: "100%" }}
        >
          <Text
            c={`${metaData.font.color}`}
            fw={700}
            style={{ fontSize: `calc(1.3rem + ${appliedFontSize})` }}
          >
            {card.title}
          </Text>
          <span
            style={{
              fontSize: `calc(3.5rem + ${appliedFontSize})`,
              color: `${metaData.font.color}`,
            }}
          >
            ${card.amount}
          </span>
          <span
            style={{
              fontSize: `calc(0.5rem + ${appliedFontSize})`,
              color: `${metaData.font.color}`,
            }}
          >
            {card.priceCaption}
          </span>
          <Text size="xl" c={`${metaData.font.color}`}>
            Billed {billDuration}{" "}
            <span style={{ fontSize: `1rem`, color: `${metaData.font.color}` }}>
              in {metaData.price.currency}
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
                c={`${metaData.font.color}`}
                style={{ fontSize: `calc(0.5rem + ${appliedFontSize})` }}
                ml={"xs"}
              >
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

        <Button
          style={{ width: "100%" }}
          bg={`${metaData.themeColor}`}
          onClick={() => alert("working")}
        >
          {card.buttonText}
        </Button>
      </Flex>
    </Card>
  );
}

function Template({
  metaData,
  templateName,
}: {
  metaData: WidgetMetaData;
  templateName: "CurvedCard" | "SectionCard" | "LeafShaped";
}) {
  return (
    <Flex direction={"column"} style={{ padding: "2em" }}>
      <Flex direction={"column"} align={"center"}>
        <Title>{metaData.title}</Title>
        <Text>{metaData.description}</Text>
      </Flex>
      <Flex gap={"lg"} justify={"center"}>
        {metaData.cards.map((card, index) => {
          return (
            <TemplateCard
              key={index}
              card={card}
              metaData={metaData}
              billDuration={
                metaData.price.duration === "M" ? "Monthly" : "Yearly"
              }
              templateName={templateName}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

export function EmbedComponent({ embedId }: { embedId: string }) {
  const { data, error, isLoading } = useQuery<
    WidgetMetaData & { templateIdUsed: string }
  >({
    queryFn: () =>
      superagent
        .get(`${backendAPI}/embed/widget-info?embedId=${embedId}`)
        .set("Accept", "application/json")
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

  let body = (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2em",
      }}
    >
      <Loader />
      <Logo width="150" height="50" style={{ marginTop: "0.5em" }} />
    </div>
  );

  if (data && !isLoading) {
    if (data.templateIdUsed == "21c86e6a-eac0-4278-8fb4-30e80bb23026") {
      body = <Template metaData={data} templateName="CurvedCard" />;
    } else if (data.templateIdUsed == "1905d495-6371-4b2a-9f6a-c4a586e0d216") {
      body = <Template metaData={data} templateName="SectionCard" />;
    } else if (data.templateIdUsed == "a4375344-6cf5-45aa-a118-831ca970d916") {
      body = <Template metaData={data} templateName="LeafShaped" />;
    } else {
      body = (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "2em",
          }}
        >
          <Text c="dimmed">Oops, something went wrong!</Text>
          <Logo width="150" height="50" style={{ marginTop: "0.5em" }} />
        </div>
      );
    }
  }

  return body;
}

const queryClient = new QueryClient();

const myColor: MantineColorsTuple = [
  "#e9fcfc",
  "#dbf3f3",
  "#b8e6e5",
  "#91d8d7",
  "#72cdcb",
  "#5ec5c3",
  "#50c2bf",
  "#40aaa8",
  "#319896",
  "#158482",
  "#D5F5F3",
];

export const theme = createTheme({
  primaryColor: "myColor",
  colors: {
    myColor,
  },
});

const embedWidgetElement = document.getElementById("embed-widget-pricepalette");

const root = ReactDOM.createRoot(embedWidgetElement!);
root.render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme}>
      <EmbedComponent
        embedId={embedWidgetElement?.getAttribute("widget-embed-id")!}
      />
    </MantineProvider>
  </QueryClientProvider>
);
