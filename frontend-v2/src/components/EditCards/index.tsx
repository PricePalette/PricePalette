import { useMetaData } from "@/stores/useMetaData";
import { Button, Group, Text, Collapse, Box, Input, Card } from "@mantine/core";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { IconArrowBackUp, IconChevronDown } from "@tabler/icons-react";

interface EditCardsProps {
  goBack: () => void;
}

const EditCards: React.FC<EditCardsProps> = ({ goBack }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const { metaData, updateWidgetMetaData } = useMetaData((state) => ({
    metaData: state.metaData,
    updateWidgetMetaData: state.updateWidgetMetaData,
  }));

  const formik = useFormik({
    initialValues: {
      cards: metaData?.cards || [],
    },
    onSubmit: (values, { setFieldError }) => {
      updateWidgetMetaData({ ...metaData, cards: values.cards });
      values.cards.forEach((card, index) => {
        if (!card.title) {
          setFieldError(
            `cards[${index}].title`,
            "Your card must contain a title"
          );
          return;
        }
      });
    },
  });

  const toggleCardEdit = (index: number) => {
    setSelectedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={{ maxHeight: "700px", overflowY: "auto" }}>
      <Box>
        <Button
          mb="md"
          leftSection={<IconArrowBackUp size={14} />}
          onClick={goBack}
        >
          Back to Widget
        </Button>
        <Group justify="center" mb={5}>
          {formik.values.cards.map((card, cardIndex) => (
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={cardIndex}
              onClick={() => toggleCardEdit(cardIndex)}
            >
              Edit Card {cardIndex + 1}
              <IconChevronDown
                size={20}
                style={{
                  transform:
                    selectedCardIndex === cardIndex
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </Card>
          ))}
        </Group>

        {formik.values.cards.map((card, cardIndex) => (
          <Collapse in={selectedCardIndex === cardIndex} key={cardIndex}>
            <form onSubmit={formik.handleSubmit}>
              <div
                key={cardIndex}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Text size="xl" my="md">{`Card ${cardIndex + 1}`}</Text>
                <Input.Wrapper label="Title" my="md">
                  <Input
                    placeholder="Card Title"
                    name={`cards[${cardIndex}].title`}
                    value={card.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Input.Wrapper>

                <Input.Wrapper label="Amount" my="md">
                  <Input
                    placeholder="Card Amount"
                    name={`cards[${cardIndex}].amount`}
                    type="number"
                    value={card.amount.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Input.Wrapper>

                <Input.Wrapper label="Button Text" my="md">
                  <Input
                    placeholder="Card Button Text"
                    name={`cards[${cardIndex}].buttonText`}
                    value={card.buttonText}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Input.Wrapper>

                <Input.Wrapper label="Price Caption" my="md">
                  <Input
                    placeholder="Card Price Caption"
                    name={`cards[${cardIndex}].priceCaption`}
                    value={card.priceCaption}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Input.Wrapper>

                {card.features.map((feature, featureIndex) => (
                  <div key={featureIndex}>
                    <Input.Wrapper
                      label={`Feature #${featureIndex + 1}`}
                      my="md"
                    >
                      <Input
                        placeholder="Feature Text"
                        name={`cards[${cardIndex}].features[${featureIndex}].text`}
                        value={feature.text}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Input.Wrapper>
                    {/* Can be added later */}
                    {/* <Input.Wrapper label={`Feature Hint #${featureIndex + 1}`}>
                        <Input
                            placeholder="Feature Hint"
                            name={`cards[${cardIndex}].features[${featureIndex}].hint`}
                            value={feature.hint || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        </Input.Wrapper> */}
                  </div>
                ))}
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Collapse>
        ))}
      </Box>
    </div>
  );
};

export default EditCards;
