import { useRouter } from "next/router";

export const useGetUrlId = () => {
  const router = useRouter();

  const widgetId = router.query.widget;

  return widgetId;
};
