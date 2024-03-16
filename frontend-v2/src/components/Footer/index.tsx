import React from "react";
import { Router, useRouter } from "next/router";
import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "../../styles/footer.module.css";
import { Logo } from "@/Logo";

const links = [
  { link: "mailto:abc@pricepalette.tech", label: "Contact Us" },
  { link: "/privacyPolicy", label: "Privacy Policy" },
  { link: "/faq", label: "FAQ" },
  { link: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  const router = useRouter();
  const items = links.map((link) => (
    <Anchor
      c="bright"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={() => router.push(link.link)}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  const handleLogo = () => {
    router.push("/");
  };

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Logo height={40} width={100} onClick={handleLogo} />
        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
