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

        const fireworks = new OpenAI({
            apiKey: userApiKey,
            baseURL: 'https://api.fireworks.ai/inference/v1',
        });

        const response = await fireworks.chat.completions.create({
            model: 'accounts/fireworks/models/llama-v3p1-405b-instruct',
            stream: true,
            max_tokens: 1000,
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