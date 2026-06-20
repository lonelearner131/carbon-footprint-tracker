/**
 * Shared TypeScript interfaces for the Carbon Footprint Tracker.
 */

export type ActivityCategory = 'transport' | 'food' | 'energy' | 'shopping';

export interface Activity {
  id: string;
  category: ActivityCategory;
  description: string;
  co2Emissions: number; // in kg
  timestamp: string; // ISO String
}

export interface CarbonState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  removeActivity: (id: string) => void;
  getAverageEmissions: () => number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChartDataEntry {
  name: string;
  value: number;
  fill: string;
}

export interface ChatRequestBody {
  messages: ChatMessage[];
  context?: {
    activities: Activity[];
  };
}
