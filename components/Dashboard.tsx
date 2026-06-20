"use client";

import React, { useMemo } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { QuickLog } from "./QuickLog";
import { Insights } from "./Insights";

const COLORS = {
  transport: "#3b82f6", // blue
  food: "#22c55e", // green
  energy: "#f59e0b", // yellow
  shopping: "#ec4899", // pink
};

export const Dashboard = () => {
  const { activities } = useCarbonStore();

  const chartData = useMemo(() => {
    const dataMap: Record<string, number> = {
      transport: 0,
      food: 0,
      energy: 0,
      shopping: 0,
    };

    activities.forEach((activity) => {
      if (dataMap[activity.category] !== undefined) {
        dataMap[activity.category] += activity.co2Emissions;
      }
    });

    return Object.keys(dataMap).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: dataMap[key],
      fill: COLORS[key as keyof typeof COLORS],
    }));
  }, [activities]);

  const totalEmissions = useMemo(() => {
    return activities.reduce((sum, act) => sum + act.co2Emissions, 0).toFixed(1);
  }, [activities]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Hub</h1>
        <p className="text-muted-foreground text-sm">
          Track, understand, and reduce your carbon footprint.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="md:col-span-2 bg-card text-card-foreground border rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Emissions Breakdown</h2>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalEmissions} kg</p>
              <p className="text-xs text-muted-foreground">Total CO2</p>
            </div>
          </div>
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
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)} kg`, "Emissions"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          <QuickLog />
          <Insights />
        </div>
      </div>
    </div>
  );
};
