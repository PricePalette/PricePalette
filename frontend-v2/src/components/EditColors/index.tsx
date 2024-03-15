import React from "react";
import { useMetaData } from "@/stores/useMetaData";
import { WidgetMetaData } from "@/types";
import EditCards from "../EditCards";
import { ColorPicker } from "@mantine/core";
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
      <div style={{ marginTop: "2rem" }}>
        <h3>Theme Color</h3>
        <ColorPicker
          format="hex"
          value={themeColor}
          onChange={handleThemeColorChange}
        />
      </div>
      <div>
        <h3>Font Color</h3>
        <ColorPicker
          format="hex"
          value={fontColor}
          onChange={handleFontColorChange}
        />
      </div>
    </div>
  );
};

export default EditColors;
