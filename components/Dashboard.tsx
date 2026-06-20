"use client";

import React from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { QuickLog } from "./QuickLog";
import { PersonalizedInsights } from "./PersonalizedInsights";
import { EmissionsChart } from "./charts/EmissionsChart";
import { useCarbonCalculations } from "@/hooks/useCarbonCalculations";

/**
 * Main Dashboard component that aggregates the carbon footprint data.
 * Displays the emission breakdown chart, quick logging actions, and personalized insights.
 */
export const Dashboard = () => {
  const { activities } = useCarbonStore();
  const { chartData, totalEmissions } = useCarbonCalculations(activities);

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
          <EmissionsChart chartData={chartData} />
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          <QuickLog />
          <PersonalizedInsights />
        </div>
      </div>
    </div>
  );
};
