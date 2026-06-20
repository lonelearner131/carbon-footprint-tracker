"use client";

import React, { useState } from "react";
import { useCarbonStore } from "@/store/useCarbonStore";
import { z } from "zod";
import type { ActivityCategory } from "@/types";

/**
 * Strict Zod schema for validating quick logs.
 * Enforces boundaries and trims strings for security.
 */
const logSchema = z.object({
  category: z.enum(["transport", "food", "energy", "shopping"]),
  description: z.string().trim().min(3, "Description too short").max(100, "Description too long"),
  co2Emissions: z.number().min(0.01, "Must be > 0").max(1000, "Value too high"),
});

/**
 * QuickLog Component.
 * Provides accessible buttons to instantly log common activities.
 * Uses strict schema validation before updating the store.
 */
export const QuickLog = () => {
  const { addActivity } = useCarbonStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleQuickLog = (
    category: ActivityCategory,
    description: string,
    co2Emissions: number
  ) => {
    try {
      setErrorMsg(null);
      const validData = logSchema.parse({ category, description, co2Emissions });
      
      setLoading(true);
      // Simulate network or logic delay
      setTimeout(() => {
        addActivity(validData);
        setLoading(false);
      }, 300);
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        setErrorMsg("Validation failed. Please try again.");
        console.error("Validation failed:", e.issues);
      }
    }
  };

  return (
    <div className="bg-card text-card-foreground border rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-3" id="quick-log-heading">Quick Log</h3>
      {errorMsg && (
        <div className="text-sm text-destructive mb-2" role="alert">
          {errorMsg}
        </div>
      )}
      <div className="flex flex-col gap-2" role="group" aria-labelledby="quick-log-heading">
        <button
          onClick={() => handleQuickLog("transport", "10km Bus Ride", 1.05)}
          disabled={loading}
          aria-label="Log 10km Bus Ride which adds 1.05 kg of CO2"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          <span>🚌 10km Bus Ride</span>
          <span className="font-medium text-xs">+1.05 kg</span>
        </button>
        <button
          onClick={() => handleQuickLog("food", "Plant-based meal", 0.5)}
          disabled={loading}
          aria-label="Log Plant-based meal which adds 0.50 kg of CO2"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          <span>🥗 Plant-based meal</span>
          <span className="font-medium text-xs">+0.50 kg</span>
        </button>
        <button
          onClick={() => handleQuickLog("energy", "1 Hour AC", 0.8)}
          disabled={loading}
          aria-label="Log 1 Hour AC usage which adds 0.80 kg of CO2"
          className="flex justify-between items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          <span>⚡ 1 Hour AC</span>
          <span className="font-medium text-xs">+0.80 kg</span>
        </button>
      </div>
    </div>
  );
};
