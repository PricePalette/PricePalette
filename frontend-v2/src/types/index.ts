export type WidgetMetaData = {
  title: string;
  price: {
    duration: "M" | "Y";
    currency: "CAD" | "USD";
  };
  cards: {
    id: string;
    title: string;
    description: string;
    img?: string;
    features: {
      text: string;
      hint?: string;
    }[];
    amount: number;
    buttonText: string;
    priceCaption: string;
    stripe_price_id?: string;
    payment_link?: string;
  }[];
  description: string;
  themeColor: string;
  font: {
    size?: "S" | "M" | "L";
    family?: string;
    color?: string;
  };
};
