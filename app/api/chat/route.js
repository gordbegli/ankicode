import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req) {
    try {
        const { messages } = await req.json();
        const userApiKey = req.headers.get('X-API-Key');

        if (!userApiKey) {
            return new Response(JSON.stringify({ error: 'No API key provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const openai = new OpenAI({
            apiKey: userApiKey,
        });

        const response = await openai.chat.completions.create({
            model: 'gpt-5.1',
            stream: true,
            max_completion_tokens: 1000,
            messages,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error in chat API:', error);
        return new Response(JSON.stringify({ error: error.message || 'An error occurred during the chat completion' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
