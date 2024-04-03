import {
  Text,
  Card,
  Badge,
  Group,
  Center,
  ActionIcon,
  rem,
  Button,
  Modal,
} from "@mantine/core";
import { IconShare, IconEye, IconTrash, IconPencil } from "@tabler/icons-react";
import classes from "../styles/dashboardWidgetCard.module.css";
import { Image } from "@mantine/core";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import request from "superagent";
import { backendAPI } from "@/utils/constants";
import { useState } from "react";
import { InstallWidgetModal } from "@/components/InstallWidgetModal";

export function DashboardWidgetCard({
  title,
  desc,
  views,
  createdDate,
  editLink,
  widgetId,
}: {
  widgetId: string;
  views: string;
  title: string;
  desc: string;
  createdDate: string;
  editLink: string;
}) {
  const date = new Date(createdDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const readableDate = date.toLocaleDateString("en-US", options as any);
  const router = useRouter();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isInstallWidgetModalOpen, setInstallWidgetModalOpen] = useState(false);

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

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section withBorder>
        <a>
          {/* eslint-disable-next-line */}
          <Image src="/Curved Card.svg" height={200} p={"0.2em"} />
        </a>
      </Card.Section>

      <Badge
        className={classes.rating}
        bg={"yellow"}
        leftSection={<IconEye color="white" size={"15"} />}
      >
        {views ? views : "0"}
      </Badge>

      <Text className={classes.title} fw={500} component="a">
        {title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {desc}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Text fz="sm" inline>
            {readableDate}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              color={"green"}
              onClick={() => router.push(editLink)}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              color={"red"}
              onClick={() => setDeleteModalOpen(true)}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare
              style={{ width: rem(16), height: rem(16) }}
              color={"blue"}
              onClick={() => setInstallWidgetModalOpen(true)}
            />
          </ActionIcon>
        </Group>
      </Group>

      <Modal
        size="xl"
        opened={isInstallWidgetModalOpen}
        onClose={() => setInstallWidgetModalOpen(false)}
        title="Install Widget"
        styles={{
          title: { fontSize: "20px", fontWeight: "bold" },
        }}
      >
        <InstallWidgetModal widgetId={widgetId} />
      </Modal>

      {/* Delete widget */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <Text size="sm">
          Deleting a widget will also delete all embed links. Are you sure you
          want to continue?
        </Text>
        <Button color="red" onClick={() => handleDelete(widgetId)} mt="md">
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
    </Card>
  );
}
