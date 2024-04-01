import { backendAPI } from "@/utils/constants";
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  TextInput,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { useQuery } from "react-query";

async function fetchUserInfo() {
  const response = await fetch(`${backendAPI}/user/info`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pp_access_token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

interface ProfileModalProps {
  isProfileModalOpen: boolean;
  setProfileModalOpen: (isOpen: boolean) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isProfileModalOpen,
  setProfileModalOpen,
}) => {
  const [stripeKey, setStripeKey] = useState<string>("");
  const [isKeySubmitted, setKeySubmitted] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleStripeKeySubmit = () => {
    console.log("Stripe Key Submitted:", stripeKey);
    setKeySubmitted(true);
  };
  const handleEditStripeKey = () => {
    setKeySubmitted(false);
  };
  const { data: userData, isLoading: profileLoading } = useQuery(
    "userInfo",
    fetchUserInfo
  );

  if (profileLoading) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <Modal
      opened={isProfileModalOpen}
      onClose={() => setProfileModalOpen(false)}
      title="Profile Settings"
      size={isSmallScreen ? "90%" : "50%"}
      styles={{
        title: { fontSize: "20px", fontWeight: "bold" },
      }}
    >
      {/* <Stack>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text size="lg" style={{ marginRight: 10, fontWeight: "bold" }}>
            Username:
          </Text>
          <Text size="lg">{userData?.content?.user_name}</Text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text size="lg" style={{ marginRight: 10, fontWeight: "bold" }}>
            Email:
          </Text>
          <Text size="lg">{userData?.content?.email}</Text>
        </div>
      </Stack> */}

      <TextInput
        label="Stripe Key"
        placeholder="Enter your Stripe Key here"
        value={stripeKey}
        onChange={(e) => setStripeKey(e.target.value)}
        disabled={isKeySubmitted}
        styles={{
          label: {
            marginBottom: 10,
          },
        }}
      />

      <Group style={{ marginTop: "1rem" }}>
        {isKeySubmitted && (
          <Button variant="default" onClick={handleEditStripeKey}>
            Edit
          </Button>
        )}
        <Button
          onClick={handleStripeKeySubmit}
          disabled={
            (stripeKey.trim().length === 0 || isKeySubmitted) && !isKeySubmitted
          }
        >
          Submit
        </Button>
      </Group>
    </Modal>
  );
};

export default ProfileModal;
