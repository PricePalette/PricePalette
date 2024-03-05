/* eslint-disable */
import React from "react";
import { Header } from "@/components/Header";
import classes from "../styles/getstarted.module.css";
import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  SimpleGrid,
  Image,
  rem,
} from "@mantine/core";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { lineHeightResolver } from "@mantine/core/lib/core/Box/style-props/resolvers/line-height-resolver/line-height-resolver";

// These templates to be fetched from API
const templates = [
  {
    id: 1,
    templateName: "Grid",
    templateDescription:
      "The Grid template offers a modern and structured layout, perfect for showcasing content in a visually appealing grid format. With flexible grid options, you can easily customize the layout to suit your needs.",
    templateImage: "/sample_template.png",
  },
  {
    id: 2,
    templateName: "List",
    templateDescription:
      "The List template provides a clean and organized way to present information in a list format. Ideal for displaying product features or any other type of sequential data. Customize it to match your brand's style effortlessly.",
    templateImage: "/sample_template.png",
  },
  {
    id: 3,
    templateName: "Cards",
    templateDescription:
      "The Cards template offers a versatile layout with cards that can be used to showcase various types of products. Each card provides a visually appealing content.",
    templateImage: "/sample_template.png",
  },
  {
    id: 4,
    templateName: "Report",
    templateDescription:
      "The Report template is designed for creating detailed and informative reports. With customizable sections and elegant formatting, you can present your data in a professional manner.",
    templateImage: "/sample_template.png",
  },
];

function getStarted() {
  const router = useRouter();

  const handleEditClick = (templateId: any) => {
    router.push(`/template/edit/${templateId}`);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div className={classes.page}>
        <SimpleGrid>
          <Text className={classes.largeText}>{"Explore Our Templates"}</Text>
          <Text className={classes.smallText}>
            {
              "Explore our ready templates to embed on your website. Use templates as they are or customize design to match your brand"
            }
          </Text>
        </SimpleGrid>
        <SimpleGrid
          cols={4}
          spacing="lg"
          verticalSpacing="lg"
          className={classes.grid}
        >
          {templates.map((template, index) => (
            <Card
              key={index}
              withBorder
              shadow="sm"
              radius="md"
              className={classes.card}
            >
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Text fw={600}>{template.templateName}</Text>
                  <Menu withinPortal position="bottom-end" shadow="sm">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDots />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={
                          <IconEdit
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        onClick={() => handleEditClick(template.id)}
                      >
                        Edit Template
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Card.Section>
              <Card.Section mt="sm">
                <Image
                  src={template.templateImage}
                  fit="cover"
                  alt={template.templateName}
                />
              </Card.Section>
              <Text mt="sm" size="md">
                {template.templateDescription}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

export default getStarted;
