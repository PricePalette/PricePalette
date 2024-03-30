import { Loader } from "@mantine/core";
import { useMetaData } from "@/stores/useMetaData";
import { useEffect } from "react";
import { gridTemplateMetaData } from "@/utils/initialMetaDatas";
import { useQuery } from "react-query";
import superagent from "superagent";
import { backendAPI } from "@/utils/constants";

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

  const { data, isLoading } = useQuery({
    queryKey: ["WidgetInfoQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/widget/info?widgetId=${widgetId}`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

  if (data) {
    setMetaData(data);
    console.log("DATA", data);
  }

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
