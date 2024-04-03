/* eslint-disable */
import {
  Group,
  ScrollArea,
  Button,
  Text,
  Container,
  Title,
  UnstyledButton,
  Box,
  ThemeIcon,
  rem,
  Skeleton,
  Flex,
  Grid,
} from "@mantine/core";
import {
  IconTemplate,
  IconDashboard,
  IconSettings,
  IconPlus,
} from "@tabler/icons-react";
import classes from "../styles/navbarnested.module.css";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { backendAPI } from "@/utils/constants";
import request from "superagent";
import { NoDataIcon } from "@/illustrations/NoData";
import { Header } from "@/components/Header";
import ProfileModal from "@/components/ProfileModal";
import { AuthOrNot } from "@/components/AuthOrNot";
import superagent from "superagent";
import { useCurrentWidgetId } from "@/stores/useCurrentWidgetId";
import { OverviewCard } from "@/components/OverviewCard";
import { DashboardWidgetCard } from "./DashboardWidgetCard";

const mockdata = [
  {
    label: "Templates",
    icon: IconTemplate,
    link: "/templates",
  },
  { label: "Profile Settings", icon: IconSettings, link: "/settings" },
  { label: "View Plans", icon: IconDashboard, link: "/viewPlans" },
];

const plans = {
  price_1Ov0bVCjcrhrZTSatO9LbWyF: "Lite",
  price_1Ov0bVCjcrhrZTSarKzaXfdL: "Pro",
  price_1Ov0bVCjcrhrZTSaNA5k670V: "Elite",
};

export default function Dashboard() {
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isInstallWidgetModalOpen, setInstallWidgetModalOpen] = useState(false);
  const currentWidgetId = useCurrentWidgetId((state) => state.currentWidgetId);
  const setCurrentWidgetId = useCurrentWidgetId(
    (state) => state.setCurrentWidgetId
  );

  const { data: userData } = useQuery({
    queryKey: ["UserQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/user/info`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["WidgetsListQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/widget/list`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

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

  const handleCreateWidget = () => {
    router.push("/templates");
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  let body = null;

  if (data && !isLoading) {
    body = (
      <AuthOrNot>
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
              <Flex gap={"md"}>
                <OverviewCard
                  type="Total Widgets"
                  metric={String(data.length)}
                />
                <OverviewCard
                  type="Total Views"
                  metric={
                    userData
                      ? `${userData.current_views} / ${userData.views_cap}`
                      : ""
                  }
                />
                <OverviewCard type="Current Plan" metric={"Lite"} />
              </Flex>
              <Flex
                align={"center"}
                justify={"space-between"}
                w={"100%"}
                mt={"md"}
              >
                <Title order={3} my="md">
                  My Widgets
                </Title>

                <Button
                  onClick={handleCreateWidget}
                  my="md"
                  leftSection={<IconPlus size={18} />}
                >
                  Create Widget
                </Button>
              </Flex>
              <div style={{ width: "100%" }}>
                {isLoading ? (
                  <Skeleton height={150} />
                ) : data && data.length > 0 ? (
                  <Grid gutter={"xl"}>
                    {data.map((item: any, index: any) => (
                      <Grid.Col span={4} key={index}>
                        <DashboardWidgetCard
                          widgetId={item.widgetId}
                          title={item.title}
                          desc={item.description}
                          views={item.views}
                          createdDate={item.createdDate}
                          editLink={`/template/edit/${item.templateIdUsed}/?widget=${item.widgetId}`}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "100%",
                      margin: 8,
                    }}
                  >
                    <NoDataIcon />
                    <Text fw={600} fz={20} mt="md">
                      No widgets as of now
                    </Text>
                  </div>
                )}
              </div>
            </Container>
            <ProfileModal
              isProfileModalOpen={isProfileModalOpen}
              setProfileModalOpen={setProfileModalOpen}
            />
          </div>
        </div>
      </AuthOrNot>
    );
  }

  return body;
}

{
  /* 
<Grid.Col span={4}>
                    <DashboardWidgetCard
                      title={item.title}
                      desc={item.description}
                      views={item.views}
                      createdDate={item.createdDate}
                    />
                  </Grid.Col> */
}

// data.map((item: any, index: any) => (
//   <Grid.Col span={4}>
//     <DashboardWidgetCard
//       title={item.title}
//       desc={item.description}
//       views={item.views}
//       createdDate={item.createdDate}
//     />
//   </Grid.Col>
// ));
