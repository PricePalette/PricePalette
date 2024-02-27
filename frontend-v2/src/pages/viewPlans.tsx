import React from 'react';
import { Card, Text, Button, Group, Container, List, ListItem } from '@mantine/core';
import { plansData } from '../../mockdata';
import { IconCheck } from '@tabler/icons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import classes from '../styles/viewplans.module.css'

export default function ViewPlans() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
          <Header />
          <Text  className={classes.largeText}>{"Choose the plan that is right for you"}</Text>
          <Text  className={classes.smallText}>{"Grow with ease, Scale your solutions, Pay as you progress"}</Text>

          <Container size="xs" className={classes.container}>

            <div className={classes.cardDiv}>
              {plansData.map((eachPlan, index) => (
                <Card key={index} shadow="lg" radius="md" className={classes.card}>
                  <Card.Section className={classes.cardSection}>
                    <Text size="lg" fw={500}>{eachPlan.title}</Text>
                    <Text size="md" style={{ marginBottom: '10px' }}>{eachPlan.subTitle}</Text>
                    <Text fw={700} style={{ fontSize: 26, lineHeight: 1, }}>{eachPlan.price}</Text>
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
    
                     {/* Handle On Click */}
                  <Button  color="#4C5897"  radius="md" style={{marginTop: '30px'}} >
                    Buy now
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
          <Footer />
        </div>
      );
}
