import { backendAPI } from "@/utils/constants";
import { Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
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

const ProfileModal: React.FC<{
  isProfileModalOpen: boolean;
  setProfileModalOpen: (isOpen: boolean) => void;
}> = ({ isProfileModalOpen, setProfileModalOpen }) => {
  const [stripeKey, setStripeKey] = useState<string>("");
  const [isKeySubmitted, setKeySubmitted] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const { isLoading: profileLoading, refetch: refetchUserInfo } = useQuery(
    "userInfo",
    fetchUserInfo,
    {
      onSuccess: (data) => {
        setStripeKey(data.content.redacted_key ?? "");
        setKeySubmitted(!!data.content.redacted_key);
      },
    }
  );

  async function addStripeKey(key: string) {
    await fetch(`${backendAPI}/user/update-secret`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pp_access_token")}`,
      },
      body: JSON.stringify({ client_secret: key }),
    });
    refetchUserInfo();
  }

  const handleStripeKeySubmit = () => {
    addStripeKey(stripeKey).catch(console.error);
    setKeySubmitted(true);
  };

  if (profileLoading) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <Modal
      opened={isProfileModalOpen}
      onClose={() => {
        setProfileModalOpen(false);
        setKeySubmitted(true);
      }}
      title="Profile Settings"
      size={isSmallScreen ? "90%" : "50%"}
      styles={{ title: { fontSize: "20px", fontWeight: "bold" } }}
    >
      <TextInput
        label="Stripe Key"
        placeholder="Enter your Stripe Key here"
        value={stripeKey}
        onChange={(e) => setStripeKey(e.target.value)}
        disabled={isKeySubmitted}
        styles={{ label: { marginBottom: 10 } }}
      />

      <Group style={{ marginTop: "1rem" }}>
        {isKeySubmitted && (
          <Button variant="default" onClick={() => setKeySubmitted(false)}>
            Edit
          </Button>
        )}
        <Button
          onClick={handleStripeKeySubmit}
          disabled={stripeKey.trim().length === 0 || isKeySubmitted}
        >
          Submit
        </Button>
      </Group>
    </Modal>
  );
};

export default ProfileModal;
