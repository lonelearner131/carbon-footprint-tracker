import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Activity {
  id: string;
  category: 'transport' | 'food' | 'energy' | 'shopping';
  description: string;
  co2Emissions: number; // in kg
  timestamp: string; // ISO String
}

interface CarbonState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  removeActivity: (id: string) => void;
  getAverageEmissions: () => number;
}

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set) => ({
      activities: [
        {
          id: 'mock-1',
          category: 'transport',
          description: '10km train ride',
          co2Emissions: 0.41,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'mock-2',
          category: 'food',
          description: 'Plant-based meal',
          co2Emissions: 0.5,
          timestamp: new Date().toISOString(),
        },
        {
          id: 'mock-3',
          category: 'energy',
          description: 'Left AC on overnight',
          co2Emissions: 4.2,
          timestamp: new Date().toISOString(),
        }
      ],
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            {
              ...activity,
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
      getAverageEmissions: () => {
        return 12.5; // kg CO2 per day national avg rough mock
      }
    }),
    {
      name: 'carbon-footprint-storage',
    }
  )
);
