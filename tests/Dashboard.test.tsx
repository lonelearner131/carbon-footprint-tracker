import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../components/Dashboard';

// Mock Recharts to avoid issues with JSDOM rendering SVG
jest.mock('recharts', () => {
  const OriginalRechartsModule = jest.requireActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    PieChart: () => <div data-testid="pie-chart" />,
  };
});

describe('Dashboard Component', () => {
  it('renders correctly with default state', async () => {
    render(<Dashboard />);
    
    // Check main headers
    expect(screen.getByText('Understand Your Footprint')).toBeInTheDocument();
    expect(screen.getByText('Emissions Breakdown')).toBeInTheDocument();
    
    // Check if chart is rendered eventually
    expect(await screen.findByTestId('pie-chart')).toBeInTheDocument();

    // Check if side components rendered
    expect(screen.getByText('Quick Log')).toBeInTheDocument();
    expect(screen.getByText('Personalized Insights & Simple Actions')).toBeInTheDocument();
  });
});
