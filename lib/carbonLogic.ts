/**
 * Carbon logic calculations for various daily activities.
 * Handles edge cases like negative distances and fallback values.
 */

/**
 * Calculates CO2 emissions for transport based on distance and vehicle type.
 * @param distance - The distance traveled in kilometers. Must be >= 0.
 * @param type - The mode of transport ('car', 'bus', 'train', 'bike').
 * @returns The CO2 emissions in kg.
 */
export const calculateTransportCO2 = (
  distance: number,
  type: 'car' | 'bus' | 'train' | 'bike'
): number => {
  if (distance < 0 || isNaN(distance)) {
    return 0;
  }

  const emissionFactors: Record<'car' | 'bus' | 'train' | 'bike', number> = {
    car: 0.192, // kg CO2 per km (average gas car)
    bus: 0.105, // kg CO2 per km
    train: 0.041, // kg CO2 per km
    bike: 0.0,  // zero emissions
  };

  const factor = emissionFactors[type] ?? 0;
  return distance * factor;
};

/**
 * Calculates average CO2 emissions for a specific type of meal.
 * @param mealType - The type of meal ('meat', 'vegetarian', 'vegan').
 * @returns The CO2 emissions in kg.
 */
export const calculateFoodCO2 = (
  mealType: 'meat' | 'vegetarian' | 'vegan'
): number => {
  if (!mealType) return 0;

  const emissionFactors: Record<'meat' | 'vegetarian' | 'vegan', number> = {
    meat: 3.3, // kg CO2 per meal
    vegetarian: 1.5,
    vegan: 0.5,
  };

  return emissionFactors[mealType] ?? 0;
};
