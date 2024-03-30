import { backendAPI } from "@/utils/constants";
import { Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import superagent from "superagent";

export function AuthOrNot({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["UserQuery", { id: 1 }],
    queryFn: () =>
      superagent
        .get(`${backendAPI}/user/info`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          `Bearer ${localStorage.getItem("pp_access_token")}`
        )
        .then((res) => res.body.content)
        .catch((error) => error.response.body),
  });

  let body: React.ReactNode = (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
      <Text mt={"md"} c={"gray"}>
        Hold on, we are checking if you are authenticated
      </Text>
    </div>
  );

  if (!isLoading && data) {
    if (data.details === "Unauthorized") {
      router.push("/login");
    }
  }

  // this means user is logged in
  if (data) {
    if (data.email) {
      body = children;
    }
  }

  return <>{body}</>;
}
