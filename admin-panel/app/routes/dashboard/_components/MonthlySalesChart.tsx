import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useGetMonthlySalesQuery } from "~/redux/api/adminApi";
import { Card, CardContent } from "~/components/ui/card";

const MonthlySalesChart = () => {
  const { data, error, isLoading } = useGetMonthlySalesQuery({});

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-md w-full">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-gray-500" size={32} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl shadow-md w-full">
        <CardContent className="p-6">
          <p className="text-red-500">Failed to load sales data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md w-full">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Sales Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="previousYearSales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlySalesChart;
