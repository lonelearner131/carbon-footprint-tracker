"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { ChartDataEntry } from "@/types";

interface EmissionsChartProps {
  chartData: ChartDataEntry[];
}

/**
 * Recharts component displaying a donut chart of carbon emissions broken down by category.
 * @param chartData - Formatted data ready for Recharts Pie component
 */
export const EmissionsChart: React.FC<EmissionsChartProps> = ({ chartData }) => {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value: unknown) => [`${Number(value).toFixed(2)} kg`, "Emissions"]} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
