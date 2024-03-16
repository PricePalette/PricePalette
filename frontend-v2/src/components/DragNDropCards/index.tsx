import { Draggable, DragDropContext, Droppable } from "@hello-pangea/dnd";
import {
  Button,
  Flex,
  Input,
  Modal,
  NumberInput,
  rem,
  TagsInput,
  Text,
} from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import {
  IconCurrencyDollar,
  IconGripVertical,
  IconPlus,
} from "@tabler/icons-react";
import classes from "@/styles/drapNDropCards.module.css";
import { useMetaData } from "@/stores/useMetaData";
import { arrayMoveImmutable } from "array-move";
import cx from "clsx";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

export function DrapNDropCards() {
  const metaData = useMetaData((state) => state.metaData);
  const updateCards = useMetaData((state) => state.updateCards);
  const [state, handlers] = useListState(metaData?.cards);
  const [opened, { open, close }] = useDisclosure(false);

  const formik = useFormik<{
    title: string;
    description: string;
    amount: number;
    priceCaption: string;
    buttonText: string;
    features: string[];
  }>({
    initialValues: {
      title: "",
      description: "",
      amount: 0,
      priceCaption: "",
      buttonText: "",
      features: [],
    },
    onSubmit: (values, { setFieldError, setValues }) => {
      const { title, description, amount, buttonText, priceCaption, features } =
        values;

      if (!title) {
        setFieldError("title", "Your card must contain a title");
        return;
      } else if (!description) {
        setFieldError("description", "Your card must contain a description");
        return;
      } else if (!amount) {
        setFieldError("amount", "Your card must have a price amount");
        return;
      } else if (!priceCaption) {
        setFieldError("priceCaption", "Your price should have a caption");
        return;
      } else if (!buttonText) {
        setFieldError("buttonText", "Your card button text cannot be empty");
        return;
      } else if (features.length < 1) {
        setFieldError("features", "Your card must have at least 1 feature");
        return;
      }

      const newFeatures: {
        text: string;
        hint?: string;
      }[] = [];

      features.forEach((feature) => {
        newFeatures.push({ text: feature, hint: "" });
      });

      const oldCards = metaData?.cards;
      oldCards?.push({
        amount,
        title,
        buttonText,
        description,
        features: newFeatures,
        priceCaption,
        id: uuidv4(),
      });
      updateCards(oldCards!);

      setValues({
        buttonText: "",
        description: "",
        features: [],
        amount: 0,
        priceCaption: "",
        title: "",
      });

      close();
    },
  });

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </div>
          <div>
            <Text>{item.title}</Text>
            <Text c="dimmed" size="sm">
              {item.description}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <div>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          console.log("oldCards: ", metaData);
          const newCards = arrayMoveImmutable(
            metaData?.cards!,
            source.index,
            destination?.index || 0
          );
          updateCards(newCards);
          console.log("newCardsNonState: ", newCards);
          console.log("newCards: ", metaData);
          return handlers.reorder({
            from: source.index,
            to: destination?.index || 0,
          });
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        style={{ width: "100%" }}
        leftSection={<IconPlus size={14} />}
        onClick={open}
      >
        Add Card
      </Button>

      <Modal opened={opened} onClose={close} title="Add Pricing Card">
        <form onSubmit={formik.handleSubmit}>
          <Input.Wrapper
            label="Title"
            description="Give a title for your new pricing card"
            error={
              formik.touched.title && Boolean(formik.errors.title)
                ? formik.errors.title
                : null
            }
          >
            <Input
              placeholder="Elite Plan..."
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>

          <Input.Wrapper
            mt={"0.5em"}
            label="Description"
            description="Give a description for your new pricing card"
            error={
              formik.touched.description && Boolean(formik.errors.description)
                ? formik.errors.description
                : null
            }
          >
            <Input
              placeholder="The best for high traffic websites..."
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>

          <Flex mt={"0.5em"}>
            <Input.Wrapper
              label={`Amount in ${metaData?.price.currency}`}
              error={
                formik.touched.amount && Boolean(formik.errors.amount)
                  ? formik.errors.amount
                  : null
              }
            >
              <NumberInput
                leftSection={<IconCurrencyDollar size={16} />}
                placeholder="2.99"
                name="amount"
                allowDecimal
                value={formik.values.amount}
                onChange={(data) => {
                  formik.setFieldValue("amount", data);
                }}
              />
            </Input.Wrapper>

            <Input.Wrapper
              label="Price Caption"
              ml={"0.5em"}
              error={
                formik.touched.priceCaption &&
                Boolean(formik.errors.priceCaption)
                  ? formik.errors.priceCaption
                  : null
              }
            >
              <Input
                placeholder="On sale - Save 52%..."
                name="priceCaption"
                value={formik.values.priceCaption}
                onChange={formik.handleChange}
              />
            </Input.Wrapper>
          </Flex>

          <Input.Wrapper
            mt={"0.5em"}
            label="Button Text"
            description="Give a title for your pricing card button"
            error={
              formik.touched.buttonText && Boolean(formik.errors.buttonText)
                ? formik.errors.buttonText
                : null
            }
          >
            <Input
              placeholder="Start Now..."
              name="buttonText"
              value={formik.values.buttonText}
              onChange={formik.handleChange}
            />
          </Input.Wrapper>

          <TagsInput
            mt={"0.5em"}
            label="Features"
            placeholder="Feature (please the enter key to add a feature)"
            defaultValue={[]}
            name="features"
            value={formik.values.features}
            onChange={(data) => {
              formik.setFieldValue("features", data);
            }}
            error={
              formik.touched.features && Boolean(formik.errors.features)
                ? formik.errors.features
                : null
            }
            clearable
          />

          <Button
            mt={"1.5em"}
            style={{ width: "100%" }}
            leftSection={<IconPlus size={14} />}
            type="submit"
          >
            Create Card
          </Button>
        </form>
      </Modal>
    </div>
  );
}
