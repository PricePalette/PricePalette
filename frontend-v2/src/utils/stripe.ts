import { loadStripe } from "@stripe/stripe-js";

export const getStripe = () => {
  const stripePromise = loadStripe(
    "pk_test_51Oq33bCjcrhrZTSaydT1dTC0e3638lyffXpSlpe3PP0e0Tx3I2uVnLeDdmEj1FEbkyoMy7c3fFzFAkkX1bXymt6W008M24i50p"
  );
  return stripePromise;
};
