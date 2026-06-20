import type { Activity } from "@/types";

export interface ContextualInsight {
  simpleAction: string;
  impact: string;
}

/**
 * generateContextualInsights
 * Pure utility function that analyzes user data and explicitly maps the highest
 * emission category to personalized, actionable, micro-level steps.
 * @param activities - Array of user's logged activities
 * @returns Array of ContextualInsight objects
 */
export const generateContextualInsights = (activities: Activity[]): ContextualInsight[] => {
  if (activities.length === 0) {
    return [
      {
        simpleAction: "Log your first activity today",
        impact: "Reduces footprint by gaining initial awareness",
      }
    ];
  }

  const totals: Record<string, number> = { transport: 0, food: 0, energy: 0, shopping: 0 };
  activities.forEach(a => totals[a.category] += a.co2Emissions);

  const highestCategory = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);

  if (highestCategory === 'transport') {
    return [
      { simpleAction: "Switch to public transit today", impact: "Reduces footprint by ~15 kg CO2 per week" },
      { simpleAction: "Consider walking or biking for trips under 2 miles", impact: "Reduces footprint by 100% for that trip" },
      { simpleAction: "Carpool with a coworker", impact: "Reduces footprint by 50% for your commute" }
    ];
  } else if (highestCategory === 'food') {
    return [
      { simpleAction: "Replace one meat meal with a plant-based option", impact: "Reduces footprint by ~2 kg CO2 per meal" },
      { simpleAction: "Buy local produce", impact: "Reduces footprint by cutting transportation emissions" },
      { simpleAction: "Plan your meals to reduce food waste", impact: "Reduces footprint by preventing methane emissions" }
    ];
  } else if (highestCategory === 'energy') {
    return [
      { simpleAction: "Switch to LED bulbs", impact: "Reduces footprint and saves energy costs" },
      { simpleAction: "Unplug idle devices", impact: "Reduces footprint by preventing phantom loads" },
      { simpleAction: "Adjust thermostat by 2 degrees", impact: "Reduces footprint by ~10% of heating/cooling CO2" }
    ];
  } else {
    // shopping
    return [
      { simpleAction: "Buy second-hand clothing", impact: "Reduces footprint by bypassing manufacturing CO2" },
      { simpleAction: "Use reusable grocery bags", impact: "Reduces footprint by preventing plastic waste" },
      { simpleAction: "Invest in high-quality items", impact: "Reduces footprint by decreasing replacement frequency" }
    ];
  }
};
