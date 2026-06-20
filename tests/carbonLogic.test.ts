import { calculateTransportCO2, calculateFoodCO2 } from '../lib/carbonLogic';

describe('Carbon Logic Calculations', () => {
  describe('calculateTransportCO2', () => {
    it('calculates correct CO2 for a 10km gas car ride', () => {
      const co2 = calculateTransportCO2(10, 'car');
      expect(co2).toBeCloseTo(1.92);
    });

    it('calculates correct CO2 for a 10km train ride', () => {
      const co2 = calculateTransportCO2(10, 'train');
      expect(co2).toBeCloseTo(0.41);
    });

    it('calculates zero CO2 for a bike ride', () => {
      const co2 = calculateTransportCO2(10, 'bike');
      expect(co2).toBe(0);
    });

    it('returns 0 for negative distance', () => {
      expect(calculateTransportCO2(-5, 'car')).toBe(0);
    });

    it('returns 0 for NaN distance', () => {
      expect(calculateTransportCO2(NaN, 'car')).toBe(0);
    });

    it('returns 0 for zero distance', () => {
      expect(calculateTransportCO2(0, 'bus')).toBe(0);
    });
  });

  describe('calculateFoodCO2', () => {
    it('returns correct value for a meat meal', () => {
      expect(calculateFoodCO2('meat')).toBe(3.3);
    });

    it('returns correct value for a vegan meal', () => {
      expect(calculateFoodCO2('vegan')).toBe(0.5);
    });

    it('returns 0 if invalid meal type is passed (TypeScript bypassed test)', () => {
      // @ts-expect-error - Testing runtime fallback
      expect(calculateFoodCO2('unknown_meal')).toBe(0);
    });
    
    it('returns 0 if null is passed (TypeScript bypassed test)', () => {
      // @ts-expect-error - Testing runtime fallback
      expect(calculateFoodCO2(null)).toBe(0);
    });
  });
});
