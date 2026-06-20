import { useMemo } from 'react';
import type { Activity, ChartDataEntry } from '@/types';

const COLORS = {
  transport: "#3b82f6", // blue
  food: "#22c55e", // green
  energy: "#f59e0b", // yellow
  shopping: "#ec4899", // pink
};

/**
 * Custom hook to encapsulate the logic for deriving chart data and totals
 * from the raw activity data stored in Zustand.
 * @param activities - The array of logged activities
 * @returns Object containing the formatted chart data and the total emissions
 */
export const useCarbonCalculations = (activities: Activity[]) => {
  const chartData: ChartDataEntry[] = useMemo(() => {
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

  const highestCategory = useMemo(() => {
    if (activities.length === 0) return 'transport';
    
    const totals: Record<string, number> = { transport: 0, food: 0, energy: 0, shopping: 0 };
    activities.forEach(a => totals[a.category] += a.co2Emissions);
    
    return Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
  }, [activities]);

  return { chartData, totalEmissions, highestCategory };
};
