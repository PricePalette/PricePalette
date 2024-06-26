import {
  Title,
  Text,
  Button,
  Container,
  List,
  ThemeIcon,
  rem,
  Image,
  Card,
  useMantineTheme,
  Group,
  Badge,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import classes from "../../src/styles/index.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import {
  IconCheck,
  IconCode,
  IconSettings,
  IconGauge,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

const mockdata = [
  {
    title: "Customizable Pricing Plans",
    description:
      "Allow users to customize their pricing plans according to their needs and preferences",
    icon: IconGauge,
  },
  {
    title: "Embedded Code Generation",
    description:
      "Generate embedded code snippets for the customized pricing plans to be easily integrated into the company’s website",
    icon: IconCode,
  },
  {
    title: "Flexible Settings",
    description:
      "Provide flexible settings to adjust various aspects of the pricing widget appearance and functionality",
    icon: IconSettings,
  },
];

const testimonial = [
  {
    company: "Testimonial1",
    logo: "/intel.png",
    name: "John Doe",
    review:
      "This website has provided templates for customizing our pricing plans and is hosted on our website",
  },
  {
    company: "Testimonial2",
    logo: "/apple.png",
    name: "Jane Doe",
    review:
      "This website has provided templates for customizing our pricing plans and is hosted on our website",
  },
  {
    company: "Testimonial3",
    logo: "/Meta.png",
    name: "John Doe",
    review:
      "This website has provided templates for customizing our pricing plans and is hosted on our website",
  },
  {
    company: "Testimonial2",
    logo: "/McD.png",
    name: "Jane Doe",
    review:
      "This website has provided templates for customizing our pricing plans and is hosted on our website",
  },
];

interface CardProps {
  company: string;
  logo: string;
  name: string;
  review: string;
}

function TCard({ company, logo, name, review }: CardProps) {
  return (
    <Paper shadow="md" p="xl" radius="md">
      <Group wrap="nowrap" gap={20}>
        <Image
          src={logo}
          alt={`Logo of ${company}`}
          height={100}
          style={{ objectFit: "contain", alignItems: "start" }}
        />
        <div>
          <Title order={2}>{name}</Title>
          <Text size="xs">{review}</Text>
        </div>
      </Group>
    </Paper>
  );
}
const slides = testimonial.map((item) => (
  <Carousel.Slide key={item.company}>
    <TCard {...item} />
  </Carousel.Slide>
));

export default function IndexPage() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/templates");
  };

  const handleViewPlansClick = () => {
    router.push("/viewPlans");
  };

  const theme = useMantineTheme();

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
      style={{ backgroundColor: "#dbf3f3" }}
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <>
      <Header />
      <Container className={classes.wrapper} size={"100%"}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Craft{" "}
            <Text component="span" className={classes.highlight} inherit>
              pricing widgets
            </Text>{" "}
            for the success of your Business
          </Title>

          <Container p={0} size={800}>
            <Text size="lg" c="bright" className={classes.description}>
              Easily enhance your website pricing strategy with customizable
              widget. Seamlessly embed your customized widgets.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              color="gray"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <Button
              className={classes.control}
              size="lg"
              onClick={handleViewPlansClick}
            >
              View Plans
            </Button>
          </div>
        </div>
      </Container>
      <Container size="xl">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2rem",
          }}
        >
          <div className={classes.content} style={{ marginTop: "5rem" }}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>Pricing Widget </span>
              templates library
            </Title>
            <Text c="bright" style={{ marginTop: "2rem" }}>
              Build fully functional accessible pricing widgets faster to embed
              into your website
            </Text>
            <List
              mt={50}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={30} radius="xl">
                  <IconCheck
                    style={{ width: rem(14), height: rem(14) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <List.Item style={{ fontSize: "1.2rem" }}>
                <b>Widget based</b> – Easily customize and create pricing
                packages tailored to your business needs.
              </List.Item>
              <List.Item style={{ fontSize: "1.2rem" }}>
                <b>Access to Templates</b> – Intuitive interface for quick and
                seamless pricing adjustments.
              </List.Item>
              <List.Item style={{ fontSize: "1.2rem" }}>
                <b>Get Code</b> – Seamless integration with your existing
                business systems and platforms.
              </List.Item>
            </List>
          </div>
          <Image
            src="/index3.png"
            alt="Pricing widget image"
            className={classes.image}
            style={{ marginTop: "6rem" }}
          />
        </div>
      </Container>
      <Container size="xl" py="xl">
        <Group justify="center">
          <Badge
            variant="filled"
            size="xl"
            style={{ marginTop: "5rem", marginBottom: "1rem" }}
          >
            Pricing Plan Customization
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="xs">
          Empower Your Customers with Custom Pricing Widgets
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="xs">
          Provide your users with the flexibility to tailor pricing plans to
          their specific requirements.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
      <Container size="xl">
        <Group justify="center">
          <Badge
            variant="filled"
            size="xl"
            style={{ marginTop: "3rem", marginBottom: "2rem" }}
          >
            Testimonials
          </Badge>
        </Group>
        <Carousel
          slideSize={{ base: "100%", sm: "50%" }}
          slideGap={{ base: "xl", sm: 2 }}
          align="start"
          slidesToScroll={2}
          suppressHydrationWarning
        >
          {slides}
        </Carousel>
      </Container>
      <Container size="xl">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2rem",
          }}
        >
          <Image
            src="/companyprofile.svg"
            alt="Company Profile"
            className={classes.image}
          />
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>About Us </span>
            </Title>
            <Text c="bright" style={{ marginTop: "2rem", marginLeft: "2rem" }}>
              At Price Palette, we specialize in providing businesses with an
              easy-to-use platform that lets them easily customize pricing
              templates for their goods and services. Our user-friendly
              instruments and Businesses can adjust pricing templates to meet
              their specific branding and needs thanks to seamless integration
              options. By integrating personalized pricing templates straight
              into their websites and providing a smooth and interesting user
              experience for their clients, businesses can use our platform to
              improve their online visibility and increase sales.
            </Text>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
