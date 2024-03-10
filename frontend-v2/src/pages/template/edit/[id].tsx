import { useState } from "react";
import {
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  Text,
  Flex,
  ActionIcon,
} from "@mantine/core";
import {
  IconTextSize,
  IconPalette,
  IconLayout,
  TablerIconsProps,
  IconZoomReset,
  IconZoomOut,
  IconZoomIn,
} from "@tabler/icons-react";
import classes from "@/styles/editTemplate.module.css";
import { useGetUrlId } from "@/utils/useGetUrlId";
import DynamicTemplateLoader from "@/components/DynamicTemplateLoader";
import { DrapNDropCards } from "@/components/DragNDropCards";
import { SetupMetadata } from "@/components/SetupMetaData";
import { useControls } from "react-zoom-pan-pinch";

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
                <Text>Temp</Text>
              </div>
              {mainLinks}
            </div>
            <div className={classes.main}>
              <Title order={4} className={classes.title}>
                {active}
              </Title>

              <div style={{ padding: "1em" }}>
                {active === "Cards" ? (
                  <DrapNDropCards />
                ) : active === "Color" ? (
                  "Color"
                ) : (
                  "Labels"
                )}
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
            border: "2px red solid",
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
