import { Text, Card, Flex } from "@mantine/core";
import { IconCards, IconCurrencyDollar, IconEye } from "@tabler/icons-react";

export function OverviewCard({
  type,
  metric,
}: {
  type: "Total Widgets" | "Total Views" | "Current Plan";
  metric: string;
}) {
  return (
    <Flex
      bg={
        type === "Total Widgets"
          ? "#316AFF"
          : type === "Total Views"
          ? "#01A657"
          : "#FE8010"
      }
      direction={"column"}
      p={"lg"}
      w={"250px"}
      style={{ borderRadius: "10px" }}
    >
      {type === "Total Widgets" ? (
        <IconCards
          style={{
            backgroundColor: "white",
            padding: "0.3em",
            borderRadius: "5px",
          }}
          size={35}
        />
      ) : type === "Total Views" ? (
        <IconEye
          style={{
            backgroundColor: "white",
            padding: "0.3em",
            borderRadius: "5px",
          }}
          size={35}
        />
      ) : (
        <IconCurrencyDollar
          style={{
            backgroundColor: "white",
            padding: "0.3em",
            borderRadius: "5px",
          }}
          size={35}
        />
      )}
      <Text c={"white"} size="md" mt={"xs"}>
        {type}
      </Text>

      <Text c={"white"} size="2rem" mt={"lg"} fw={"bold"}>
        {metric}
      </Text>
    </Flex>
  );
}
