import { GridTemplate } from "@/templates/GridTemplate";

interface DynamicTemplateLoaderProps {
  id: string;
}

const DynamicTemplateLoader: React.FC<DynamicTemplateLoaderProps> = ({
  id,
}) => {
  switch (id) {
    case "21c86e6a-eac0-4278-8fb4-30e80bb23026":
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
