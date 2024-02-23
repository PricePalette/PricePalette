import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export default function IndexPage() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <Header />
      <Group justify="center" mt="xl">
        <Button onClick={() => setColorScheme("light")}>Light</Button>
        <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        <Button onClick={() => setColorScheme("auto")}>Auto</Button>
      </Group>
      <Footer />
    </>
  );
}
