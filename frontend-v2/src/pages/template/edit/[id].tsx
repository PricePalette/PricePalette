import { useState } from "react";
import {
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  Flex,
  ActionIcon,
  Button,
  Avatar,
  Box,
  Group,
  Popover,
} from "@mantine/core";
import {
  IconTextSize,
  IconPalette,
  IconLayout,
  TablerIconsProps,
  IconZoomReset,
  IconZoomOut,
  IconZoomIn,
  IconRocket,
  IconExternalLink,
} from "@tabler/icons-react";
import classes from "@/styles/editTemplate.module.css";
import { useGetUrlId } from "@/utils/useGetUrlId";
import DynamicTemplateLoader from "@/components/DynamicTemplateLoader";
import { DrapNDropCards } from "@/components/DragNDropCards";
import { SetupMetadata } from "@/components/SetupMetaData";
import { useControls } from "react-zoom-pan-pinch";
import EditLabels from "@/components/EditLabels";
import EditColors from "@/components/EditColors";
import { LetterLogo } from "@/illustrations/LetterLogo";
import { UserInfoCard } from "@/components/UserInfoCard";
import { backendAPI } from "@/utils/constants";
import { getUserAvatar } from "@/utils/getUserAvatar";
import { useQuery } from "react-query";
import superagent from "superagent";
import { useRouter } from "next/router";

export type WidgetSettingType = "Cards" | "Color" | "Labels";

const mainLinksMockdata: {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: WidgetSettingType;
}[] = [
  { icon: IconLayout, label: "Cards" },
  { icon: IconPalette, label: "Color" },
  { icon: IconTextSize, label: "Labels" },
];

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ActionIcon.Group>
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Zoom In"
        onClick={() => zoomIn()}
      >
        <IconZoomIn style={{ width: rem(20) }} stroke={1.5} />
      </ActionIcon>

      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Zoom Out"
        onClick={() => zoomOut()}
      >
        <IconZoomOut style={{ width: rem(20) }} stroke={1.5} />
      </ActionIcon>

      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Zoom Reset"
        onClick={() => resetTransform()}
      >
        <IconZoomReset style={{ width: rem(20) }} stroke={1.5} />
      </ActionIcon>
    </ActionIcon.Group>
  );
};

export default function EditTemplatePage() {
  // getting the widget id from url
  const widgetId = useGetUrlId();
  let body = null;
  const [active, setActive] = useState<WidgetSettingType>("Cards");

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  // unless the page has a widgetId dont render anything
  // widgetId initially is undefined then it carries a value
  if (widgetId) {
    body = (
      <>
        <nav
          className={classes.navbar}
          style={{ height: "100%", width: "30%" }}
        >
          <div className={classes.wrapper}>
            <div className={classes.aside}>
              <div className={classes.logo}>
                <LetterLogo width={38} height={38} />
              </div>
              {mainLinks}
              <Profile />
            </div>
            <div className={classes.main}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  height: "100%",
                }}
              >
                <Title order={4} className={classes.title}>
                  {active}
                </Title>

                <div
                  style={{
                    padding: "1em",
                  }}
                >
                  {active === "Cards" ? (
                    <DrapNDropCards />
                  ) : active === "Color" ? (
                    <EditColors />
                  ) : (
                    <EditLabels />
                  )}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    backgroundColor: "white",
                    padding: "1.5em",
                  }}
                >
                  <Button
                    color="#edc639"
                    style={{ width: "100%" }}
                    leftSection={<IconRocket size={18} />}
                    onClick={() => alert("WIP: webpack functionality")}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div
          style={{
            width: "80%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            overflow: "scroll",
          }}
        >
          <DynamicTemplateLoader id={Number(widgetId)} />
        </div>
      </>
    );
  }

  return (
    <SetupMetadata widgetId={widgetId}>
      <Flex style={{ height: "100vh" }}>{body}</Flex>
    </SetupMetadata>
  );
}

function Profile() {
  const router = useRouter();
  let body = null;

  const { data } = useQuery({
    queryKey: ["UserQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/user/info`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content),
  });

  if (data) {
    body = (
      <Popover width={300} trapFocus position="top-start" withArrow shadow="md">
        <Popover.Target>
          <Avatar
            src={getUserAvatar(data.user_name)}
            size={40}
            radius={40}
            style={{ cursor: "pointer", marginRight: "0.5em" }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <UserInfoCard email={data.email} username={data.user_name} />
        </Popover.Dropdown>
      </Popover>
    );
  } else {
    body = (
      <Popover width={300} trapFocus position="top-start" withArrow shadow="md">
        <Popover.Target>
          <Avatar
            src={
              "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png"
            }
            size={40}
            radius={40}
            style={{ cursor: "pointer", marginRight: "0.5em" }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Group justify="center">
            <Button
              rightSection={<IconExternalLink size={14} />}
              variant="default"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            <Button
              rightSection={<IconExternalLink size={14} />}
              onClick={() => router.push("/register")}
            >
              Sign up
            </Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
    );
  }

  return (
    <Box ml={"auto"} mt={"auto"} mb="md">
      <header className={classes.header}>
        <Group justify="space-between" h="100%" align="center">
          {body}
        </Group>
      </header>
    </Box>
  );
}
