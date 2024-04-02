/* eslint-disable */
import React from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import {
  Card,
  Text,
  Grid,
  SimpleGrid,
  Container,
  Group,
  Skeleton,
} from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import superagent, { SuperAgent } from "superagent";
import { SERVER_ERROR, SERVER_SUCCESS, backendAPI } from "@/utils/constants";
import { useState } from "react";
import { useEffect } from "react";
import { useMetaData } from "@/stores/useMetaData";
import { gridTemplateMetaData } from "@/utils/initialMetaDatas";
import { WidgetMetaData } from "@/types";
import { toErrorMap } from "@/utils/toErrorMap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Template {
  templateId: string;
  templateName: string;
  templateDescription: string;
  templateImage: string;
}

export default function templates() {
  const mutation = useMutation({
    mutationFn: (data: WidgetMetaData & { templateIdUsed: string }) => {
      return superagent
        .post(`${backendAPI}/widget/create`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .send(data)
        .then((res) => res.body)
        .catch((error) => error.response.body);
    },
    onSuccess: (data, variables) => {
      // error
      if (data.message === SERVER_ERROR) {
        console.log("error");
        if (data.detail === "User not subscribed to a plan") {
          toast.error(
            "You need to subscribe to a pricing plan before creating a widget. Redirecting you there...",
            {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                router.push("/viewPlans");
              },
              transition: Bounce,
            }
          );
        }

        if (data.details === "Unauthorized") {
          router.push("/login");
        }
      }

      // success
      if (data.message === SERVER_SUCCESS) {
        router.push(
          `/template/edit/${variables.templateIdUsed}?widget=${data.content.widget_id}`
        );
      }
    },
  });

  const router = useRouter();

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
          {mutation.isLoading ? (
            <>
              <Skeleton visible={true} height={"200px"}>
                Creating your widget
              </Skeleton>

              <Skeleton
                visible={true}
                height={"200px"}
                style={{ marginTop: 20 }}
              >
                Creating your widget
              </Skeleton>

              <Skeleton
                visible={true}
                height={"200px"}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                Creating your widget
              </Skeleton>
            </>
          ) : (
            templates.map((template) => (
              <Card
                key={template.templateId}
                withBorder
                shadow="sm"
                radius="md"
                style={{ marginBottom: 20, cursor: "pointer" }}
                onClick={() =>
                  mutation.mutate({
                    ...gridTemplateMetaData,
                    templateIdUsed: template.templateId,
                  })
                }
              >
                <Group wrap="nowrap" gap={20}>
                  <img
                    src={
                      template.templateId ===
                      "21c86e6a-eac0-4278-8fb4-30e80bb23026"
                        ? "/Curved Card.svg"
                        : template.templateId ===
                          "1905d495-6371-4b2a-9f6a-c4a586e0d216"
                        ? "/Section Card.svg"
                        : "/Leaf Card.svg"
                    }
                    alt={template.templateName}
                    width={300}
                    height={300}
                  />
                  <div style={{ padding: "10px" }}>
                    <Text
                      style={{ color: "#5ec5c3", fontWeight: 650 }}
                      mt="xs"
                      mb="xs"
                      size="xl"
                    >
                      {template.templateName}
                    </Text>
                    <Text size="lg" style={{ color: "#666" }}>
                      {template.templateDescription}
                    </Text>
                  </div>
                </Group>
              </Card>
            ))
          )}
        </div>
        <ToastContainer style={{ width: "500px" }} />
      </Container>
    </>
  );
}
