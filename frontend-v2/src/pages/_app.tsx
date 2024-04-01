import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Head>
          <title>PricePalette</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
        <ProgressBar
          height="4px"
          color="#50c2c0"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </MantineProvider>
    </QueryClientProvider>
  );
}
