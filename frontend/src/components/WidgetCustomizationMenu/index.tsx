import { Box, Button, ButtonGroup } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useShowCustomizationMenu } from "@/stores/useShowCustomizationMenu";

type ToolsMapType = { title: string; component: React.ReactNode }[];

export default function WidgetCustomizationMenu() {
  const currentTool = useShowCustomizationMenu((state) => state.currentTool);
  const setCurrentTool = useShowCustomizationMenu(
    (state) => state.setCurrentTool
  );

  const toolsMap: ToolsMapType = [
    {
      title: "Cards",
      component: <PaletteIcon />,
    },
    {
      title: "Color",
      component: <ViewCarouselIcon />,
    },
    {
      title: "Labels",
      component: <EditNoteIcon />,
    },
  ];

  return (
    <Box style={{ padding: "1em" }}>
      <ButtonGroup size="large" aria-label="Large button group">
        {toolsMap.map((tool, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                if (currentTool === tool.title) {
                  setCurrentTool(null);
                } else {
                  setCurrentTool(tool.title);
                }
              }}
            >
              {tool.component}
              <span style={{ marginLeft: "1em" }}>{tool.title}</span>
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}
