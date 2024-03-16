import { GridTemplate } from "@/templates/GridTemplate";

interface DynamicTemplateLoaderProps {
  id: number;
}

const DynamicTemplateLoader: React.FC<DynamicTemplateLoaderProps> = ({
  id,
}) => {
  switch (id) {
    case 1:
      return <GridTemplate />;
    case 2:
      return <GridTemplate />;
    case 3:
      return <GridTemplate />;
    default:
      return <p>No component found for this ID.</p>;
  }
};

export default DynamicTemplateLoader;
