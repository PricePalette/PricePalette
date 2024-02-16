import Header from "@/components/Header";
import { useIsAuth } from "@/utils/useIsAuth";

export default function DashboardPage() {
  useIsAuth();

  return (
    <div>
      <Header />
      Dashboard page
    </div>
  );
}
