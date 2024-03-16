import {
  Group,
  ScrollArea,
  Button,
  Card,
  Image,
  Text,
  Container,
  Title,
  UnstyledButton,
  Box,
  ThemeIcon,
  rem,
  Loader,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { IconTemplate, IconDashboard, IconSettings } from "@tabler/icons-react";
import classes from "../styles/navbarnested.module.css";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { backendAPI } from "@/utils/constants";
import request from "superagent";
import { NoDataIcon } from "@/illustrations/NoData";
import { Header } from "@/components/Header";
import ProfileModal from "@/components/ProfileModal";

const mockdata = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  {
    label: "Templates",
    icon: IconTemplate,
    link: "/getStarted",
  },
  { label: "Profile Settings", icon: IconSettings, link: "/settings" },
];

const fetchWidgetList = async () => {
  const jwtToken = localStorage.getItem("pp_access_token");
  const response = await fetch(`${backendAPI}/widget/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default function Dashboard() {
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery("widgets", fetchWidgetList);

  const deleteWidget = async (widgetId: any) => {
    const jwtToken = localStorage.getItem("pp_access_token");
    await request
      .delete(`${backendAPI}/widget/delete?widgetId=${widgetId}`)
      .set("Authorization", `Bearer ${jwtToken}`);
  };

  const {
    mutate: deleteWidgetMutate,
    error: deleteError,
    isError,
  } = useMutation(deleteWidget, {
    onSuccess: () => {
      setDeleteModalOpen(false);
      router.reload();
    },
    onError: (error) => {
      console.error(deleteError);
    },
  });

  const handleDelete = (widgetId: any) => deleteWidgetMutate(widgetId);

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );

  const handleCreateWidget = () => {
    router.push("/getStarted");
  };

  const handleEdit = (templateId: any, widgetId: any) => {
    router.push(`/template/edit/${templateId}/?widget=${widgetId}`);
  };

  const handleExport = () => {
    console.log("Export");
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };
  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Navbar */}
        <nav className={classes.navbar}>
          <ScrollArea className={classes.links}>
            {mockdata.map(({ label, icon: Icon, link }) => (
              <UnstyledButton
                key={label}
                className={classes.control}
                onClick={() => {
                  if (label === "Profile Settings") {
                    handleProfileClick();
                  } else {
                    router.push(link);
                  }
                }}
              >
                <Group justify="space-between" gap={0}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="light" size={30}>
                      <Icon style={{ width: rem(18), height: rem(18) }} />
                    </ThemeIcon>
                    <Box ml="md">{label}</Box>
                  </Box>
                </Group>
              </UnstyledButton>
            ))}
          </ScrollArea>
        </nav>
        {/* Content */}
        <Container fluid={true} className={classes.container}>
          <Title order={2} my="md">
            Welcome Back
          </Title>
          <Button onClick={handleCreateWidget} my="md">
            Create Widget
          </Button>

          <Title order={3} my="lg">
            Widgets
          </Title>

          {data && data.content?.length > 0 ? (
            data.content.map((item: any, index: any) => (
              <Card key={index} withBorder radius="md" className={classes.card}>
                <div className={classes.cardContent}>
                  <Group>
                    <Image
                      src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                      height={160}
                      fit="cover"
                      alt="A description of the image"
                    />
                    <div className={classes.body}>
                      <Text className={classes.title} mt="xs" mb="md">
                        {item.title}
                      </Text>
                      <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                        {item.description}
                      </Text>
                    </div>
                  </Group>
                  <div
                    className={classes.buttonsRight}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{ alignSelf: "flex-end", marginBottom: "auto" }}
                    >
                      <Button
                        onClick={() =>
                          handleEdit(item.templateIdUsed, item.widgetId)
                        }
                        my="sm"
                        mr="xs"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button onClick={handleExport} my="sm" mr="xs">
                        Export
                      </Button>
                    </div>
                    <div style={{ alignSelf: "flex-end" }}>
                      <Button
                        color="red"
                        onClick={() => setDeleteModalOpen(true)}
                        my="sm"
                        mr="xs"
                      >
                        Delete
                      </Button>
                    </div>

                    <Modal
                      opened={isDeleteModalOpen}
                      onClose={() => setDeleteModalOpen(false)}
                      title="Confirm Deletion"
                    >
                      <Text>Are you sure you want to delete this widget?</Text>
                      <Button
                        color="red"
                        onClick={() => handleDelete(item.widgetId)}
                        mt="md"
                      >
                        Yes, delete it
                      </Button>
                      <Button
                        variant="subtle"
                        onClick={() => setDeleteModalOpen(false)}
                        mt="md"
                      >
                        Cancel
                      </Button>
                    </Modal>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                margin: 8,
              }}
            >
              <NoDataIcon />{" "}
              <Text fw={600} fz={20} mt="md">
                No widgets as of now
              </Text>
            </div>
          )}
        </Container>
        <ProfileModal
          isProfileModalOpen={isProfileModalOpen}
          setProfileModalOpen={setProfileModalOpen}
        />
      </div>
    </div>
  );
}
