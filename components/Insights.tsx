"use client";

import React, { useMemo } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";

export const Insights = () => {
  const { activities, getAverageEmissions } = useCarbonStore();

  const totalEmissions = useMemo(() => {
    return activities.reduce((sum, act) => sum + act.co2Emissions, 0);
  }, [activities]);

  const avg = getAverageEmissions();
  const percentage = Math.min((totalEmissions / avg) * 100, 100);

  return (
    <div className="bg-card text-card-foreground border rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Gamified Insights</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Your Daily vs Avg ({avg}kg)</span>
            <span className="font-medium">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                percentage > 80 ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Actionable Tip:</strong> Switching to LED bulbs will save you ~1.5 kg of CO2 per month!
          </p>
        </div>
      </div>
    </div>
  );
};
