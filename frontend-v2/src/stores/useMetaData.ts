import { WidgetMetaData } from "@/types";
import { create } from "zustand";

interface MetaDataSate {
  metaData: null | WidgetMetaData;
  setMetaData: (metaData: null | WidgetMetaData) => void;
  updateCards: (newCards: WidgetMetaData["cards"]) => void;
  updateWidgetMetaData: (updates: Partial<WidgetMetaData>) => void;
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
}));
