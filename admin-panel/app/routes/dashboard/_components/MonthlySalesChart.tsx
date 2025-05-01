"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useGetMonthlySalesQuery } from "~/redux/api/adminApi";
import { Card, CardContent } from "~/components/ui/card";

const MonthlySalesChart = () => {
  // Fetch monthly sales data using RTK Query hook
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
            <Bar dataKey="totalSales" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlySalesChart;
