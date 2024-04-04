import { Stack, Text } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";

export function InstallWidgetModal({ embedId }: { embedId: string }) {
  return (
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
widget-embed-id="${embedId}"
></div>
  `}
        language="html"
        withCopyButton={true}
        mt="xs"
      />
    </Stack>
  );
}
