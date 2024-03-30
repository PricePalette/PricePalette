/* eslint-disable */
import React from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { Card, Text, Grid, SimpleGrid, Container, Group } from "@mantine/core";
import { useQuery } from "react-query";
import { SuperAgent } from "superagent";
import { backendAPI } from "@/utils/constants";
import { useState } from "react";
import { useEffect } from "react";

interface Template {
  templateId: string;
  templateName: string;
  templateDescription: string;
  templateImage: string;
}

export default function templates() {
  const router = useRouter();
  const handleCardClick = (templateId: any) => {
    router.push(`/template/edit/${templateId}`);
  };

  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplates = async () => {
    const response = await fetch(`${backendAPI}/template/list`, {
      method: "GET",
    });
    const responseData = await response.json();
    setTemplates(responseData.content);
  };

  useEffect(() => {
    getTemplates();
  }, []);

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
              key={template.templateId}
              withBorder
              shadow="sm"
              radius="md"
              style={{ marginBottom: 20, cursor: "pointer" }}
              onClick={() => handleCardClick(template.templateId)}
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
