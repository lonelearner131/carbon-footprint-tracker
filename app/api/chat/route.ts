import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Build the prompt using the context from Zustand
    let systemPrompt = "You are a helpful AI assistant for a Carbon Footprint Awareness platform.";

    if (context) {
      const { activities } = context;

      const transportEmissions = activities
        .filter((a: any) => a.category === 'transport')
        .reduce((sum: number, a: any) => sum + a.co2Emissions, 0);

      const foodEmissions = activities
        .filter((a: any) => a.category === 'food')
        .reduce((sum: number, a: any) => sum + a.co2Emissions, 0);

      systemPrompt += `\nHere is the user's current context based on their logged activities:
- Total Transport Emissions: ${transportEmissions.toFixed(2)} kg CO2
- Total Food Emissions: ${foodEmissions.toFixed(2)} kg CO2

If transport emissions are high, dynamically suggest localized transit alternatives or remote work tips. If food emissions are high, suggest plant-based recipes or local produce options. Provide concise, actionable advice.`;
    }

    // Combine system prompt and user messages for Gemini
    const fullPrompt = `${systemPrompt}\n\nUser: ${messages[messages.length - 1].content}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
    });

    return NextResponse.json({ message: response.text });
  } catch (error: any) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'An error occurred while communicating with the AI' },
      { status: 500 }
    );
  }
}
