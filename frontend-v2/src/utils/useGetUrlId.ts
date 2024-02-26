import { useRouter } from "next/router";

export const useGetUrlId = () => {
  const router = useRouter();

  return router.query.id;
};
