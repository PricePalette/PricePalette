import { Container, Title, Text, Grid, Card, Button } from "@mantine/core";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Container size="xl">
        <Title order={1} style={{ marginBottom: "20px" }}>
          Welcome back!
        </Title>
        <Grid gutter="lg">
          <div style={{ display: "flex", gap: "20px" }}>
            <Card shadow="sm">
              <Title order={2}>Templates</Title>
              <Text>View and manage your templates here.</Text>
              <Link href="/getStarted">
                <Button variant="outline" style={{ marginTop: "10px" }}>
                  View Templates
                </Button>
              </Link>
            </Card>
            <Card shadow="sm">
              <Title order={2}>Edited Template</Title>
              <Text>View the template you recently edited.</Text>
              <Link href="/template/edit">
                <Button variant="outline" style={{ marginTop: "10px" }}>
                  View Edited Template
                </Button>
              </Link>
            </Card>
          </div>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
