import { Card, Group, Text, Menu, ActionIcon, SimpleGrid, Image, rem } from '@mantine/core';

  
function GridTemplate() {
    return (
        <SimpleGrid
        cols={4}
        spacing="lg"
        verticalSpacing="lg"
        style={{  flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}}
      >

        {[0,1,2].map((template, index) => (
          <Card key={index} withBorder shadow="sm" radius="md" style={{height: 400, width: 300}}>
            <Card.Section withBorder inheritPadding py="xs">
              <Group justify="space-between">
                <Text fw={600}>{"templateName"}</Text>
              </Group>
            </Card.Section>

            <Text mt="sm" color="dimmed" size="md">
              {"templateDescription"}
            </Text>

          </Card>
        ))}
      </SimpleGrid>
      );
}

export default GridTemplate