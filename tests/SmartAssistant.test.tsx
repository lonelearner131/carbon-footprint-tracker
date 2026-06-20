import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmartAssistant } from '../components/SmartAssistant';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'AI test response' }),
  })
) as jest.Mock;

describe('SmartAssistant Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders correctly and has accessible elements', () => {
    render(<SmartAssistant />);
    
    expect(screen.getByText('Smart Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about reducing/i)).toBeInTheDocument();
    
    // Check for aria-live region
    const liveRegion = screen.getByRole('log');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('handles sending a message', async () => {
    const user = userEvent.setup();
    render(<SmartAssistant />);
    
    const input = screen.getByPlaceholderText(/Ask about reducing/i);
    const button = screen.getByRole('button', { name: /Send message/i });

    // Ensure button is disabled initially since input is empty
    expect(button).toBeDisabled();

    // Type message
    await user.type(input, 'How do I reduce my carbon footprint?');
    expect(input).toHaveValue('How do I reduce my carbon footprint?');
    
    // Button should now be enabled
    expect(button).not.toBeDisabled();

    // Click send
    await user.click(button);

    // Verify input clears
    expect(input).toHaveValue('');

    // Wait for AI response to appear
    expect(await screen.findByText('AI test response')).toBeInTheDocument();

    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
