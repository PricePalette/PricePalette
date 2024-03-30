import { Loader } from "@mantine/core";
import { useMetaData } from "@/stores/useMetaData";
import { useEffect } from "react";
import { gridTemplateMetaData } from "@/utils/initialMetaDatas";

export function SetupMetadata({
  children,
  widgetId,
}: {
  children: React.ReactNode;
  widgetId: string | string[] | undefined;
}) {
  console.log("widgetId from setupmetadata", widgetId);

  const metaData = useMetaData((state) => state.metaData);
  const setMetaData = useMetaData((state) => state.setMetaData);

  useEffect(() => {
    switch (widgetId) {
      case "21c86e6a-eac0-4278-8fb4-30e80bb23026":
        setMetaData(gridTemplateMetaData);
    }
  }, [widgetId, setMetaData]);

  let body: React.ReactNode = (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );

  if (metaData) {
    body = children;
  }

  return <>{body}</>;
}
