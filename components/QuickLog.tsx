"use client";

import React, { useState } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { z } from "zod";

const logSchema = z.object({
  category: z.enum(["transport", "food", "energy", "shopping"]),
  description: z.string().min(3, "Description is too short"),
  co2Emissions: z.number().min(0.01, "Must be greater than 0"),
});

export const QuickLog = () => {
  const { addActivity } = useCarbonStore();
  const [loading, setLoading] = useState(false);

  const handleQuickLog = (
    category: "transport" | "food" | "energy" | "shopping",
    description: string,
    co2Emissions: number
  ) => {
    try {
      const validData = logSchema.parse({ category, description, co2Emissions });
      setLoading(true);
      // Simulate network or logic delay
      setTimeout(() => {
        addActivity(validData);
        setLoading(false);
      }, 300);
    } catch (e: any) {
      console.error("Validation failed:", e.errors);
    }
  };

  return (
    <div className="bg-card text-card-foreground border rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Quick Log</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleQuickLog("transport", "10km Bus Ride", 1.05)}
          disabled={loading}
          aria-label="Log 10km Bus Ride"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors"
        >
          <span>🚌 10km Bus Ride</span>
          <span className="font-medium text-xs">+1.05 kg</span>
        </button>
        <button
          onClick={() => handleQuickLog("food", "Plant-based meal", 0.5)}
          disabled={loading}
          aria-label="Log Plant-based meal"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors"
        >
          <span>🥗 Plant-based meal</span>
          <span className="font-medium text-xs">+0.50 kg</span>
        </button>
        <button
          onClick={() => handleQuickLog("energy", "1 Hour AC", 0.8)}
          disabled={loading}
          aria-label="Log 1 Hour AC"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors"
        >
          <span>⚡ 1 Hour AC</span>
          <span className="font-medium text-xs">+0.80 kg</span>
        </button>
      </div>
    </div>
  );
};
