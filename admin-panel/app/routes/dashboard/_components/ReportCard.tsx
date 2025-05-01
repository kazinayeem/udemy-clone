import { Card, CardContent } from "~/components/ui/card";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: React.ReactNode;
  icon: LucideIcon;
  color?: string; // optional custom text color
  iconBg?: string; // optional custom icon background color
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  iconBg = "bg-muted",
}: StatCardProps) => (
  <Card className="rounded-2xl shadow-sm w-full hover:shadow-lg transition">
    <CardContent className="p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
