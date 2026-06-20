"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ChartDataEntry } from "@/types";

// Dynamically import Recharts component to avoid SSR bloat
const EmissionsChart = dynamic(
  () => import("./charts/EmissionsChart").then((mod) => mod.EmissionsChart),
  { ssr: false, loading: () => <div className="h-64 w-full mt-4 flex items-center justify-center text-slate-700 dark:text-slate-300">Loading chart...</div> }
);

interface MetricsCardProps {
  totalEmissions: string;
  chartData: ChartDataEntry[];
}

/**
 * MetricsCard Component
 * Displays the core emissions breakdown metrics using the dynamically loaded chart.
 * Uses strict interfaces and HTML5 semantics.
 */
export const MetricsCard: React.FC<MetricsCardProps> = ({ totalEmissions, chartData }) => {
  return (
    <article className="md:col-span-2 bg-card text-card-foreground border rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Emissions Breakdown</h2>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{totalEmissions} kg</p>
          <p className="text-xs text-slate-700 dark:text-slate-300">Total CO2</p>
        </div>
      </header>
      <section aria-label="Emissions Chart">
        <EmissionsChart chartData={chartData} />
      </section>
    </article>
  );
};
