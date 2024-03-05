import { create } from "zustand";

interface ShowCustomizationMenuState {
  currentTool: null | string;
  setCurrentTool: (tool: null | string) => void;
}

export const useShowCustomizationMenu = create<ShowCustomizationMenuState>()(
  (set) => ({
    currentTool: null,
    setCurrentTool: (tool) => set(() => ({ currentTool: tool })),
  })
);
