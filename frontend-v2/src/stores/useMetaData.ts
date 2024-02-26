import { WidgetMetadata } from "@/types";
import { create } from "zustand";

interface MetadataSate {
  metadata: null | WidgetMetadata;
  setMetadata: (metadata: null | WidgetMetadata) => void;
}

export const useMetaData = create<MetadataSate>()((set) => ({
  metadata: null,
  setMetadata: (metadata) => set(() => ({ metadata })),
}));
