import { useRouter } from "next/router";

export const useGetUrlWidgetId = () => {
  const router = useRouter();

  const widgetId = router.query.widget;

  return widgetId;
};
