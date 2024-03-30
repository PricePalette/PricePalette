import { AuthOrNot } from "@/components/AuthOrNot";
import Dashboard from "@/modules/Dashboard";

export default function DashboardPage() {
  return (
    <AuthOrNot>
      <Dashboard />
    </AuthOrNot>
  );
}
