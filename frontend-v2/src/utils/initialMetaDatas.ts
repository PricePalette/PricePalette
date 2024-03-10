/* 
    - This file contains the initial metaData for all templates
*/
import { WidgetMetaData } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const gridTemplateMetaData: WidgetMetaData = {
  title: "Website hosting pricing table",
  price: {
    duration: "M",
    currency: "CAD",
  },
  description: "View our plans",
  themeColor: "#FF7801",
  font: {
    size: "m",
    family: "Arial",
    color: "#FFFFFF",
  },
  // this is just for now, will change when integrating with API
  widgetId: "8a0d2edd-79d3-4628-a7fd-f22890930a95",
  updatedFields: [],
  cards: [
    {
      id: uuidv4(),
      title: "Basic",
      description: "Ideal for small businesses",
      features: [
        {
          text: "1 website",
        },
        {
          text: "20GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "5 email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 2.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 52%",
    },
    {
      id: uuidv4(),
      title: "Standard",
      description: "Perfect for a corporate website",
      features: [
        {
          text: "3 websites",
        },
        {
          text: "50GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "Unlimited email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 5.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 46%",
    },
    {
      id: uuidv4(),
      title: "Premium",
      description: "The best for high traffic websites",
      features: [
        {
          text: "Unlimited websites",
        },
        {
          text: "100GB SSD Storage",
          hint: "Our servers have high-performance SSD drives for both files & databases so your sites load incredibly fast.",
        },
        {
          text: "Unlimited email accounts",
        },
        {
          text: "Unlimited bandwidth",
        },
        {
          text: "Free SSL",
          hint: "Helps you protect your clients privacy and site security and improves your Google Search Ranking.",
        },
      ],
      amount: 11.99,
      buttonText: "Start Now",
      priceCaption: "On sale - Save 42%",
    },
  ],
};
