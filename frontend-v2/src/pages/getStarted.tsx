/* eslint-disable */

import React from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import classes from '../styles/getstarted.module.css';
import { Card, Group, Text, Menu, ActionIcon, SimpleGrid, Image, rem } from '@mantine/core';
import { IconDots, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';

// These templates to be fetched from API
const templates = [
  {
    id:1,
    templateName: 'Grid Template',
    templateDescription: 'This is a sample description of Grid Template',
    templateImage: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
  },
  {
    id:2,
    templateName: 'List Template',
    templateDescription: 'This is a sample description of List Template',
    templateImage: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
  },
  {
    id:3,
    templateName: 'Card Template',
    templateDescription: 'This is a sample description of Card Template',
    templateImage: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
  },
  {
    id:4,
    templateName: 'Report Template',
    templateDescription: 'This is a sample description of Report Template',
    templateImage: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png'
  }
];


function getStarted() {
    const router = useRouter(); 
  
    const handleEditClick = (templateId:any) => {
    router.push(`/template/edit/${templateId}`);
    };

  return (
    <div>
      <Header />
      <SimpleGrid>
        <Text  className={classes.largeText}>{"Explore Our Templates"}</Text>
        <Text  className={classes.smallText}>{"Personalize any template to match your unique style and needs."}</Text>
      </SimpleGrid>

      <SimpleGrid
        cols={4}
        spacing="lg"
        verticalSpacing="lg"
        className={classes.grid}
      >
        {templates.map((template, index) => (
          <Card key={index} withBorder shadow="sm" radius="md" className={classes.card}>
            <Card.Section withBorder inheritPadding py="xs" >
              <Group justify="space-between" >
                <Text fw={600}>{template.templateName}</Text>
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                  <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                        onClick={() => handleEditClick(template.id)}>
                      Edit Template
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card.Section>

            <Text mt="sm" color="dimmed" size="md">
              {template.templateDescription}
            </Text>

            <Card.Section mt="sm">
              <Image src={template.templateImage} fit="cover" alt={template.templateName} />
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
      <Footer />
    </div>
  );
}

export default getStarted;
