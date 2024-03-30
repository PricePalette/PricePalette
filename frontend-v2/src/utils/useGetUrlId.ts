import { useRouter } from "next/router";

export const useGetUrlId = () => {
  const router = useRouter();

  const widgetId = router.query.widget;

  // If 'widget' ID is not present,take 'template' ID
  return widgetId || router.query.id;
};
