import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { Activity } from '@/types';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Strict Zod schema for validating the incoming payload to the API.
 * Ensures the messages array is well-formed and limits content length.
 */
const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().trim().min(1).max(2000),
    })
  ).min(1),
  context: z.object({
    activities: z.array(
      z.object({
        id: z.string().trim().min(1).max(100),
        category: z.enum(['transport', 'food', 'energy', 'shopping']),
        description: z.string().trim().min(1).max(100),
        co2Emissions: z.number().min(0).max(1000),
        timestamp: z.string().trim().min(1).max(100)
      })
    ).optional()
  }).optional()
});

/**
 * POST handler for the /api/chat route.
 * Handles AI chat logic securely on the server side.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = chatRequestSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const { messages, context } = parsedData.data;

    // Build the prompt using the context from Zustand
    let systemPrompt = "You are an expert AI Carbon Footprint Assistant designed to provide highly personalized, actionable advice for an urban commuter and consumer.";
    
    if (context && context.activities && context.activities.length > 0) {
      const activities = context.activities as Activity[];
      
      const totals: Record<string, number> = { transport: 0, food: 0, energy: 0, shopping: 0 };
      activities.forEach((a) => {
        totals[a.category] += a.co2Emissions;
      });

      const highestCategory = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);

      systemPrompt += `\n\nCRITICAL CONTEXT - The user has logged the following emission totals:
- Transport: ${totals.transport.toFixed(2)} kg CO2
- Food: ${totals.food.toFixed(2)} kg CO2
- Energy: ${totals.energy.toFixed(2)} kg CO2
- Shopping: ${totals.shopping.toFixed(2)} kg CO2

The user's highest emission category is currently **${highestCategory.toUpperCase()}**.

DIRECTIVE: You must explicitly acknowledge their specific logged data in your responses. 
Example format: "I see you logged X kg in transport today. Because you live in an urban area, have you considered taking the subway instead of driving?"
Keep advice extremely concise, practical, and tailored strictly to an urban lifestyle.`;
    }

    // Combine system prompt and user messages for Gemini
    const fullPrompt = `${systemPrompt}\n\nUser: ${messages[messages.length - 1].content}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
    });

    return NextResponse.json({ message: response.text });
  } catch (error: unknown) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'An error occurred while communicating with the AI' },
      { status: 500 }
    );
  }
}
