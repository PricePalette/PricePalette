import { useMetaData } from "@/stores/useMetaData";
import {
  Box,
  Button,
  Card,
  Group,
  Input,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useFormik } from "formik";
import { WidgetMetaData } from "@/types";
import EditCards from "../EditCards";

function EditLabel() {
  const [view, setView] = useState("editWidget");
  const { metaData, updateWidgetMetaData } = useMetaData((state) => ({
    metaData: state.metaData,
    updateWidgetMetaData: state.updateWidgetMetaData,
  }));

  const formik = useFormik<Partial<WidgetMetaData>>({
    initialValues: {
      title: metaData?.title || "",
      description: metaData?.description || "",
      font: {
        size: metaData?.font?.size || "s",
      },
      price: {
        duration: "M",
        currency: "CAD",
      },
    },
    onSubmit: (values) => {},
    validate: (values) => {
      const errors: Partial<WidgetMetaData> = {};
      if (!values.title) {
        errors.title = "Widget must contain a title";
      }
      if (!values.description) {
        errors.description = "Widget must contain a description";
      }

      return errors;
    },
  });

  if (view === "editWidget") {
    return (
      <div>
        <Text size="xl">Edit Widget Labels</Text>
        <Box my="xl">
          <Input.Wrapper
            label="Title"
            my="md"
            error={
              formik.touched.title && Boolean(formik.errors.title)
                ? formik.errors.title
                : null
            }
          >
            <Input
              placeholder="Widget Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.setFieldTouched("title", true, true);
                if (!formik.errors.title) {
                  updateWidgetMetaData({ title: e.target.value });
                }
              }}
              error={formik.errors.title}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Description"
            my="md"
            error={
              formik.touched.description && Boolean(formik.errors.description)
                ? formik.errors.description
                : null
            }
          >
            <Input
              placeholder="Widget Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.setFieldTouched("description", true, false);
                if (!formik.errors.description) {
                  updateWidgetMetaData({ description: e.target.value });
                }
              }}
              error={formik.errors.description}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Font Size" my="md">
            <Select
              name="font.size"
              value={formik.values.font?.size}
              onChange={(value) => {
                if (
                  metaData &&
                  (value === "s" || value === "m" || value === "l")
                ) {
                  formik.setFieldValue("font.size", value);
                  updateWidgetMetaData({
                    ...metaData,
                    font: { ...metaData.font, size: value },
                  });
                }
              }}
              data={[
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
                { value: "l", label: "Large" },
              ]}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Price Duration" my="md">
            <Select
              name="price.duration"
              value={formik.values.price?.duration}
              onChange={(value) => {
                if (metaData && (value === "M" || value === "Y")) {
                  formik.setFieldValue("price.duration", value);
                  updateWidgetMetaData({
                    ...metaData,
                    price: { ...metaData.price, duration: value },
                  });
                }
              }}
              data={[
                { value: "M", label: "Monthly" },
                { value: "Y", label: "Yearly" },
              ]}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Price Currency" my="md">
            <Select
              name="price.currency"
              value={formik.values.price?.currency}
              onChange={(value) => {
                if (metaData && (value === "CAD" || value === "USD")) {
                  formik.setFieldValue("price.currency", value);
                  updateWidgetMetaData({
                    ...metaData,
                    price: { ...metaData.price, currency: value },
                  });
                }
              }}
              data={[
                { value: "CAD", label: "Canadian Dollar" },
                { value: "USD", label: "US Dollar" },
              ]}
            />
          </Input.Wrapper>
          <Card shadow="sm" padding="xs" radius="md" withBorder my="md">
            <Text fw={500}>Cards</Text>
            <Button
              fullWidth
              mt="md"
              radius="md"
              onClick={() => setView("editCards")}
            >
              Edit
            </Button>
          </Card>
        </Box>
      </div>
    );
  } else if (view === "editCards") {
    return <EditCards goBack={() => setView("editWidget")} />;
  }
}

export default EditLabel;
