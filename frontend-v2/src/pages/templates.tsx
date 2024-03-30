/* eslint-disable */
import React from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { Card, Text, Grid, SimpleGrid, Container, Group } from "@mantine/core";

export default function templates() {
  const router = useRouter();
  const handleEditClick = (templateId: any) => {
    router.push(`/template/edit/${templateId}`);
  };

  // These templates to be fetched from API
  const templates = [
    {
      id: 1,
      templateName: "Grid",
      templateDescription:
        "The Grid template offers a modern and structured layout, perfect for showcasing content in a visually appealing grid format. With flexible grid options, you can easily customize the layout to suit your needs.",
      templateImage: "/sample_template2.png",
    },
    {
      id: 2,
      templateName: "List",
      templateDescription:
        "The List template provides a clean and organized way to present information in a list format. Ideal for displaying product features or any other type of sequential data. Customize it to match your brand's style effortlessly.",
      templateImage: "/sample_template1.png",
    },
    {
      id: 3,
      templateName: "Cards",
      templateDescription:
        "The Cards template offers a versatile layout with cards that can be used to showcase various types of products. Each card provides a visually appealing content.",
      templateImage: "/sample_template2.png",
    },
    {
      id: 4,
      templateName: "Report",
      templateDescription:
        "The Report template is designed for creating detailed and informative reports. With customizable sections and elegant formatting, you can present your data in a professional manner.",
      templateImage: "/sample_template1.png",
    },
  ];

  return (
    <>
      <Header />
      <Container size="lg">
        <SimpleGrid>
          <Text
            style={{
              marginTop: "2rem",
              fontSize: "3rem",
              fontWeight: "600",
              color: "#5ec5c3",
              alignItems: "center",
            }}
          >
            {"Explore Our Templates"}
          </Text>
          <Text
            style={{
              marginBottom: "2rem",
              fontSize: "1.5rem",
              color: "#666",
              alignItems: "center",
            }}
          >
            {
              "Explore our ready templates to embed on your website. Use templates as they are or customize design to match your brand"
            }
          </Text>
        </SimpleGrid>
        <div style={{ padding: 20 }}>
          {templates.map((template) => (
            <Card
              key={template.id}
              withBorder
              shadow="sm"
              radius="md"
              style={{ marginBottom: 20 }}
            >
              <Group wrap="nowrap" gap={20}>
                <img
                  src={template.templateImage}
                  alt={template.templateName}
                  width={600}
                  height={400}
                />
                <div style={{ padding: "10px" }}>
                  <Text
                    style={{ color: "#5ec5c3", fontWeight: 650 }}
                    mt="xs"
                    mb="md"
                    size="xl"
                  >
                    {template.templateName}
                  </Text>
                  <Text size="md" style={{ color: "#666" }}>
                    {template.templateDescription}
                  </Text>
                </div>
              </Group>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
