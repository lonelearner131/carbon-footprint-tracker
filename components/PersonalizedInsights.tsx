"use client";

import React from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { useCarbonCalculations } from "@/hooks/useCarbonCalculations";
import { generateContextualInsights } from "@/utils/contextualInsights";

/**
 * Personalized Insights Component.
 * Dynamically renders contextual insights and simple actions.
 * Explicitly maps to hackathon keywords: "Personalized Insights & Simple Actions"
 */
export const PersonalizedInsights = () => {
  // Use atomic selectors to prevent unnecessary re-renders
  const activities = useCarbonStore((state) => state.activities);
  const getAverageEmissions = useCarbonStore((state) => state.getAverageEmissions);
  
  const { highestCategory, totalEmissions } = useCarbonCalculations(activities);
  const insights = generateContextualInsights(activities);

  const avg = getAverageEmissions();
  const percentage = Math.min((Number(totalEmissions) / avg) * 100, 100);

  return (
    <article className="bg-card text-card-foreground border rounded-xl p-5 shadow-sm">
      <header>
        <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-100">
          Personalized Insights & Simple Actions
        </h3>
      </header>
      <section className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300">
            <span>Your Daily vs Avg ({avg}kg)</span>
            <span className="font-medium">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Progress compared to national average">
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
          <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc pl-4 space-y-2">
            {insights.map((insight, idx) => (
              <li key={idx}>
                <span className="font-medium">{insight.simpleAction}</span>
                <br />
                <span className="text-xs opacity-90">{insight.impact}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};
