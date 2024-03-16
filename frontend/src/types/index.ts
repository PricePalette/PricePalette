export type WidgetMetadata = {
  title: string;
  price: {
    duration: "M" | "Y";
    currency: "CAD" | "USD";
  };
  cards: {
    title: string;
    description: string;
    img: string;
    features: {
      text: string;
      hint?: string;
    }[];
    amount: number;
    buttonText: string;
    priceCaption: string;
  }[];
  description: string;
  themeColor: `#${string}`;
  font: {
    size: "s" | "m" | "l";
    family: string;
    color: `#${string}`;
  };
  widgetId: string;
  updatedFields: string[];
};