// Calculate CO2 emissions for various activities

/**
 * Calculate CO2 for transport
 * @param distance in km
 * @param type 'car' | 'bus' | 'train' | 'bike'
 * @returns kg of CO2
 */
export const calculateTransportCO2 = (distance: number, type: 'car' | 'bus' | 'train' | 'bike'): number => {
  const emissionFactors = {
    car: 0.192, // kg CO2 per km (average gas car)
    bus: 0.105, // kg CO2 per km
    train: 0.041, // kg CO2 per km
    bike: 0.0, // zero emissions
  };
  return distance * emissionFactors[type];
};

/**
 * Calculate CO2 for food
 * @param mealType 'meat' | 'vegetarian' | 'vegan'
 * @returns kg of CO2
 */
export const calculateFoodCO2 = (mealType: 'meat' | 'vegetarian' | 'vegan'): number => {
  const emissionFactors = {
    meat: 3.3, // kg CO2 per meal
    vegetarian: 1.5,
    vegan: 0.5,
  };
  return emissionFactors[mealType];
};
