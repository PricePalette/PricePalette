import { useQuery } from "@tanstack/react-query";
import superagent from "superagent";
import { backendAPI } from "./constants";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useIsAuth = () => {
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

  console.log("useIsAuth: ", data);
  console.log("useIsAuth isLoading: ", isLoading);

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [isLoading, data, router]);
};
