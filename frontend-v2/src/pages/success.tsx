import React from "react";
import { Badge, Button, Container, Title, Text, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { IconArrowBack } from "@tabler/icons-react";

export default function Success() {
  const router = useRouter();
  return (
    <Container
      size="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Badge size="xl" variant="filled" style={{ marginBottom: 20 }}>
        Payment Successful
      </Badge>

      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push("/dashboard")}
        leftSection={<IconArrowBack size={18} />}
      >
        Dashboard
      </Button>
    </Container>
  );
}
