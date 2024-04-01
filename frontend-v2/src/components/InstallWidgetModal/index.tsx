import { backendAPI } from "@/utils/constants";
import { Skeleton, Stack, Text } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";

import { useQuery } from "react-query";
import superagent from "superagent";
import "@mantine/code-highlight/styles.css";

export function InstallWidgetModal({ widgetId }: { widgetId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["EmbedIdQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/widget/embed?widgetId=${widgetId}`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

  let body = (
    <Skeleton visible={true} height={"150px"}>
      Creating a public embedId for your widget
    </Skeleton>
  );

  if (data && !isLoading) {
    body = (
      <Stack>
        <Text c="dimmed" size="sm">
          Copy and paste this code into desired place of your website (HTML
          editor, website template, theme, etc.).
        </Text>
        <CodeHighlight
          code={`
<link
    rel="stylesheet"
    href="https://pricepalettefiles.blob.core.windows.net/dist/bundle.css"
/>
<script
    type="module"
    src="https://pricepalettefiles.blob.core.windows.net/dist/bundle.js"
></script>
        
<div
    id="embed-widget-pricepalette"
    widget-embed-id="${data.embed_id}"
></div>
        `}
          language="html"
          withCopyButton={true}
          mt="xs"
        />
      </Stack>
    );
  }

  return body;
}
