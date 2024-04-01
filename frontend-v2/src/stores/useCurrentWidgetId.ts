import { create } from "zustand";

interface CurrentWidgetIdState {
  currentWidgetId: null | string;
  setCurrentWidgetId: (currentWidgetId: null | string) => void;
}

export const useCurrentWidgetId = create<CurrentWidgetIdState>()((set) => ({
  currentWidgetId: null,
  setCurrentWidgetId: (currentWidgetId) => set(() => ({ currentWidgetId })),
}));
