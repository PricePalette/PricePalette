import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { getStripe } from "../utils/stripe";
import { Modal, TextInput, Button, Text, Box } from "@mantine/core";

const Checkout = () => {
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [messages, setMessages] = useState<string>("");
  const [paymentIntent, setPaymentIntent] = useState<any>(null);

  useEffect(() => {
    if (router.query.client_secret && router.query.subscription_id) {
      setClientSecret(router.query.client_secret as string);
      setSubscriptionId(router.query.subscription_id as string);
    }
  }, [router.query]);

  const stripe = useStripe();
  const elements = useElements();

  const setMessage = (message: string) => {
    setMessages((prev) => `${prev}\n\n${message}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret as string,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
            address: {
              city: city,
              country: country,
              line1: line,
              postal_code: postalCode,
              state: state,
            },
          },
        },
      }
    );

    if (error) {
      setMessage(error.message || "An error occurred");
      return;
    }

    setPaymentIntent(paymentIntent);
  };

  if (paymentIntent && paymentIntent.status === "succeeded") {
    router.push("/success");
  }

  return (
    <>
      <Modal
        opened={true}
        onClose={() => router.push(`/viewPlans`)}
        title="Checkout"
        centered
        styles={{
          title: {
            fontSize: "1.25rem",
            fontWeight: 500,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Full name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={8}
            styles={{
              label: {
                fontSize: "1rem",
                marginBottom: 4,
              },
            }}
          />
          <TextInput
            label="Address"
            placeholder="Enter Address Line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            mb={8}
            styles={{
              label: {
                fontSize: "1rem",
                marginBottom: 4,
              },
            }}
          />
          <TextInput
            label="City"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            mb={8}
            styles={{
              label: {
                fontSize: "1rem",
                marginBottom: 4,
              },
            }}
          />
          <TextInput
            label="State"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            mb={8}
            styles={{
              label: {
                fontSize: "1rem",
                marginBottom: 4,
              },
            }}
          />
          <TextInput
            label="Country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            mb={8}
            styles={{
              label: {
                fontSize: "1rem",
                marginBottom: 4,
              },
            }}
          />
          <Text fw={500}>Card Details</Text>
          <div
            style={{
              margin: "4px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <CardElement />
          </div>

          <Button type="submit" fullWidth style={{ marginTop: 20 }}>
            Make Payment
          </Button>

          {messages && (
            <Text
              color="red"
              size="sm"
              style={{ align: "center", marginTop: 20 }}
            >
              {messages}
            </Text>
          )}
        </form>
      </Modal>
    </>
  );
};

export default function WrappedSubscribe() {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
