import React from "react";
import { useMetaData } from "@/stores/useMetaData";
import { WidgetMetaData } from "@/types";
import EditCards from "../EditCards";
import { ColorInput, ColorPicker } from "@mantine/core";
import { useState } from "react";
import { Text } from "@mantine/core";

const EditColors = () => {
  const { metaData, updateThemeColor, updateFontColor } = useMetaData(
    (state) => ({
      metaData: state.metaData,
      updateThemeColor: state.updateThemeColor,
      updateFontColor: state.updateFontColor,
    })
  );

  const [themeColor, setThemeColor] = useState(metaData?.themeColor || "");
  const [fontColor, setFontColor] = useState(metaData?.font?.color || "");

  const handleThemeColorChange = (colorHex: string) => {
    setThemeColor(colorHex);
    updateThemeColor(colorHex);
  };

  const handleFontColorChange = (colorHexFont: string) => {
    setFontColor(colorHexFont);
    updateFontColor(colorHexFont);
  };

  return (
    <div>
      <Text size="xl">Edit Colors</Text>
      <div style={{ marginTop: "1em" }}>
        <ColorInput
          label="Theme Color"
          description="Set a color for your theme"
          placeholder={themeColor}
          format="hex"
          value={themeColor}
          onChange={handleThemeColorChange}
        />
      </div>
      <div style={{ marginTop: "2em" }}>
        <ColorInput
          label="Font Color"
          description="Set a color for your fonts"
          placeholder={fontColor}
          format="hex"
          value={fontColor}
          onChange={handleFontColorChange}
        />
      </div>
    </div>
  );
};

export default EditColors;
