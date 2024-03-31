import { Loader, Text } from "@mantine/core";
import { useMetaData } from "@/stores/useMetaData";
import { useQuery } from "react-query";
import superagent from "superagent";
import { backendAPI } from "@/utils/constants";
import { useEffect } from "react";

export function SetupMetadata({
  children,
  widgetId,
}: {
  children: React.ReactNode;
  widgetId: string | string[] | undefined;
}) {
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

  useEffect(() => {
    // save the initialMetaData from api in global store
    if (data && !isLoading && !metaData) {
      setMetaData(data);
    }
  }, [data, isLoading, metaData, setMetaData]);

  let body: React.ReactNode = (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Loader />
      <Text c="dimmed" mt={"md"}>
        You still there? We are almost done...
      </Text>
    </div>
  );

  if (metaData) {
    body = children;
  }

  return <>{body}</>;
}
