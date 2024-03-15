import { WidgetMetaData } from "@/types";
import { create } from "zustand";

interface MetaDataSate {
  metaData: null | WidgetMetaData;
  setMetaData: (metaData: null | WidgetMetaData) => void;
  updateCards: (newCards: WidgetMetaData["cards"]) => void;
  updateWidgetMetaData: (updates: Partial<WidgetMetaData>) => void;
  updateThemeColor: (colorHex: string) => void;
  updateFontColor: (colorHexFont: string) => void;
}

export const useMetaData = create<MetaDataSate>()((set) => ({
  metaData: null,
  setMetaData: (metaData) => set(() => ({ metaData })),
  updateCards: (newCards) =>
    set((state) => ({ metaData: { ...state.metaData!, cards: newCards } })),
  updateWidgetMetaData: (updates: Partial<WidgetMetaData>) =>
    set((state) => ({
      metaData: {
        ...state.metaData!,
        ...updates,
      },
    })),
  updateThemeColor: (colorHex) =>
    set((state) => ({
      metaData: { ...state.metaData!, themeColor: colorHex },
    })),
  updateFontColor: (colorHexFont) =>
    set((state) => ({
      metaData: {
        ...state.metaData!,
        font: { ...state.metaData?.font, color: colorHexFont },
      },
    })),
}));
