"use client";

import React from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { QuickLog } from "./QuickLog";
import { PersonalizedInsights } from "./PersonalizedInsights";
import { MetricsCard } from "./MetricsCard";
import { useCarbonCalculations } from "@/hooks/useCarbonCalculations";

/**
 * Main Dashboard component that aggregates the carbon footprint data.
 * Displays the emission breakdown chart, quick logging actions, and personalized insights.
 */
export const Dashboard = () => {
  // Use atomic selectors
  const activities = useCarbonStore((state) => state.activities);
  const { chartData, totalEmissions } = useCarbonCalculations(activities);

  return (
    <main className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Understand Your Footprint</h1>
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          Track, understand, and reduce your carbon footprint.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Dashboard Overview">
        <MetricsCard totalEmissions={totalEmissions} chartData={chartData} />

        {/* Side Panel */}
        <aside className="flex flex-col gap-6" aria-label="Action Panel">
          <QuickLog />
          <PersonalizedInsights />
        </aside>
      </section>
    </main>
  );
};
