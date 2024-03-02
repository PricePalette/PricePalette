import { Grid, Image, Container, Title, Accordion } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import classes from "../styles/faq.module.css";

const placeholder = "This is a sample answer";

export default function Faq() {
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size="lg">
          <Grid id="faq-grid" gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src="/logo-png.png" alt="Frequently Asked Questions" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion
                chevronPosition="right"
                defaultValue="reset-password"
                variant="separated"
              >
                <Accordion.Item className={classes.item} value="reset-password">
                  <Accordion.Control>
                    How can I reset my password?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="another-account"
                >
                  <Accordion.Control>
                    Can I create more that one account?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="edit-widget">
                  <Accordion.Control>
                    How to edit widget templates?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="embed">
                  <Accordion.Control>
                    How to extract Code to embed widget?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="payment">
                  <Accordion.Control>
                    What payment systems to you work with?
                  </Accordion.Control>
                  <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}
