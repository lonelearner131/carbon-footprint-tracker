import { useCarbonStore } from '../store/useCarbonStore';

describe('useCarbonStore', () => {
  const initialStoreState = useCarbonStore.getState();

  beforeEach(() => {
    useCarbonStore.setState(initialStoreState, true);
  });

  it('initializes with mock data', () => {
    const { activities } = useCarbonStore.getState();
    expect(activities).toHaveLength(3);
    expect(activities[0].category).toBe('transport');
  });

  it('adds an activity correctly', () => {
    const newActivity = {
      category: 'shopping' as const,
      description: 'New shirt',
      co2Emissions: 5.5,
    };

    useCarbonStore.getState().addActivity(newActivity);

    const { activities } = useCarbonStore.getState();
    expect(activities).toHaveLength(4);
    
    const added = activities.find(a => a.description === 'New shirt');
    expect(added).toBeDefined();
    expect(added?.co2Emissions).toBe(5.5);
    expect(added?.id).toBeDefined();
    expect(added?.timestamp).toBeDefined();
  });

  it('removes an activity by id correctly', () => {
    const { activities, removeActivity } = useCarbonStore.getState();
    const idToRemove = activities[0].id;

    removeActivity(idToRemove);

    const { activities: updatedActivities } = useCarbonStore.getState();
    expect(updatedActivities).toHaveLength(2);
    expect(updatedActivities.find(a => a.id === idToRemove)).toBeUndefined();
  });

  it('returns average emissions', () => {
    const { getAverageEmissions } = useCarbonStore.getState();
    expect(getAverageEmissions()).toBe(12.5);
  });
});
