import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ✅ Crucial: Await the conversion of frontend 'parts' to model messages
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      messages: modelMessages,
      system: `You are Sagar's professional AI assistant. 
      Answer questions based on this info:
      - MS in CS at Saint Louis University (GPA 3.4).
      - Technical Lead at Open Source SLU (Saltify project).
      - Expert in React, Node.js, Python, GCP, and AWS.`,
    });

    // ✅ Use toTextStreamResponse for the latest AI SDK 5.0 patterns
    return result.toTextStreamResponse(); 
  } catch (error: any) {
    console.error("AI Route Error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to generate response" 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}