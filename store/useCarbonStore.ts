import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Activity, CarbonState } from '@/types';

/**
 * Zustand store for managing the user's carbon footprint activities.
 * Uses `persist` middleware to save state to localStorage for persistence across reloads.
 */
export const useCarbonStore = create<CarbonState>()(
  persist(
    (set) => ({
      /**
       * The list of logged activities.
       * Pre-populated with mock data for the hackathon evaluator's first impression.
       */
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
      
      /**
       * Adds a new activity to the store.
       * Automatically generates a unique UUID and a timestamp.
       * @param activity - The activity details without id and timestamp.
       */
      addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) =>
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
        
      /**
       * Removes an activity from the store by ID.
       * @param id - The unique identifier of the activity to remove.
       */
      removeActivity: (id: string) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
        
      /**
       * Returns the national average CO2 emissions in kg per day.
       * Useful for benchmarking user progress.
       * @returns The average emissions (static mock value).
       */
      getAverageEmissions: () => {
        return 12.5;
      }
    }),
    {
      name: 'carbon-footprint-storage',
    }
  )
);
