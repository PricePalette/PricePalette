import { GridTemplate } from "@/templates/GridTemplate";
import { useGetUrlId } from "@/utils/useGetUrlId";

interface DynamicTemplateLoaderProps {
  id: string;
}

const DynamicTemplateLoader: React.FC<DynamicTemplateLoaderProps> = ({
  id,
}) => {
  const widgetId = useGetUrlId();
  switch (id) {
    case `${widgetId}`:
      return <GridTemplate />;
    case " 2":
      return <GridTemplate />;
    case "3":
      return <GridTemplate />;
    default:
      return <p>No component found for this ID.</p>;
  }
};

export default DynamicTemplateLoader;
