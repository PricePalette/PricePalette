import { GridTemplate } from "@/templates/GridTemplate";
import { useGetUrlWidgetId } from "@/utils/useGetUrlId";
import { GridTemplate2 } from "@/templates/GridTemplate2";
import { GridTemplate3 } from "@/templates/GridTemplate3";

interface DynamicTemplateLoaderProps {
  id: string;
}

const DynamicTemplateLoader: React.FC<DynamicTemplateLoaderProps> = ({
  id,
}) => {
  switch (id) {
    case "21c86e6a-eac0-4278-8fb4-30e80bb23026":
      return <GridTemplate />;
    case "1905d495-6371-4b2a-9f6a-c4a586e0d216":
      return <GridTemplate2 />;
    case "a4375344-6cf5-45aa-a118-831ca970d916":
      return <GridTemplate3 />;
    default:
      return <p>No component found for this ID.</p>;
  }
};

export default DynamicTemplateLoader;
