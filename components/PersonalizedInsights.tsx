"use client";

import React from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { useCarbonCalculations } from "@/hooks/useCarbonCalculations";

const TIPS = {
  transport: [
    "Switching to public transit 2 days a week saves ~15kg CO2.",
    "Carpool with a coworker for a massive carbon footprint cut.",
    "Consider walking or biking for trips under 2 miles."
  ],
  food: [
    "Replacing one meat meal a day with a plant-based option saves ~2kg CO2.",
    "Buy local produce to cut down on transportation emissions.",
    "Reduce food waste; it accounts for 8% of global emissions."
  ],
  energy: [
    "Switching to LED bulbs saves energy and reduces your footprint.",
    "Unplug devices when not in use to prevent phantom loads.",
    "Adjust your thermostat by 2 degrees to save massive amounts of CO2."
  ],
  shopping: [
    "Buy second-hand clothes to slash manufacturing footprints.",
    "Invest in high-quality items that last longer to reduce waste.",
    "Bring reusable bags to the grocery store."
  ]
};

/**
 * Personalized Insights Component.
 * Dynamically determines the user's highest emission category 
 * and displays actionable, context-aware tips to reduce it.
 */
export const PersonalizedInsights = () => {
  const { activities, getAverageEmissions } = useCarbonStore();
  const { highestCategory, totalEmissions } = useCarbonCalculations(activities);

  const avg = getAverageEmissions();
  const percentage = Math.min((Number(totalEmissions) / avg) * 100, 100);

  const tipsForHighestCategory = TIPS[highestCategory as keyof typeof TIPS];

  return (
    <div className="bg-card text-card-foreground border rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Personalized Insights</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Your Daily vs Avg ({avg}kg)</span>
            <span className="font-medium">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={`h-2.5 rounded-full transition-all ${
                percentage > 80 ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 space-y-2">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>High {highestCategory} Emissions Detected:</strong>
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc pl-4 space-y-1">
            {tipsForHighestCategory.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
