import Header from "@/components/Header";
import RenderWidget from "@/components/RenderWidget";
import WidgetCustomizationMenu from "@/components/WidgetCustomizationMenu";
import WidgetSettings from "@/components/WidgetSettings";
import { useShowCustomizationMenu } from "@/stores/useShowCustomizationMenu";
import { Slide } from "@mui/material";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function EditTemplatePage() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTool = useShowCustomizationMenu((state) => state.currentTool);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          padding: "0.5em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WidgetCustomizationMenu />
      </div>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          border: "2px red solid",
          height: "100%",
        }}
      >
        {currentTool ? (
          <Slide
            in={!!currentTool}
            direction="right"
            container={containerRef.current}
          >
            <div
              style={{
                border: "2px green solid",
                width: "36.3%",
              }}
            >
              <WidgetSettings tool={currentTool} />
            </div>
          </Slide>
        ) : null}
        <div
          style={{
            border: "2px blue solid",
            width: currentTool ? "63.7%" : "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RenderWidget />
        </div>
      </div>
    </div>
  );
}
