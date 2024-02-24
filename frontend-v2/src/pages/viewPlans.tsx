import React from 'react';
import { Card, Text, Button, Group, Container, List, ListItem } from '@mantine/core';
import { plansData } from '../../mockdata';
import { IconCheck } from '@tabler/icons-react';

export default function ViewPlans() {
  return (
    // <Header/>
    <Container size="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        {plansData.map((eachPlan, index) => (
          <Card key={index} shadow="lg" radius="md" style={{ width: 300, height: 440, padding: 18 }}>
            <Card.Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <Text size="lg" fw={500}>{eachPlan.title}</Text>
              <Text size="md" style={{ marginBottom: '10px' }}>{eachPlan.subTitle}</Text>
              <Text fw={700} style={{ fontSize: 26, lineHeight: 1, marginBottom: '20px' }}>{eachPlan.price}</Text>
            </Card.Section>

            <Group mt="md" mb="xs" style={{ alignItems: 'flex-start' }}>
              <List style={{ marginTop: '8px' }}>
                {eachPlan.features.map((eachFeature, index) => (
                  <ListItem key={index} icon={<IconCheck size={18} />} style={{ marginBottom: '8px' }}>
                    {eachFeature}
                  </ListItem>
                ))}
              </List>
            </Group>

            <Button variant="light" color="blue" mt="md" radius="md">
              Buy now
            </Button>
          </Card>
        ))}
      </div>
    </Container>
    // <Footer/>
  );
}
