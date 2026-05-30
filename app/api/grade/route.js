import OpenAI from 'openai';
import Mixpanel from 'mixpanel';
import { systemPrompt } from './systemPrompt';

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

export async function POST(req) {
    try {
        const { userCode, expectedTemplate, templateName } = await req.json();
        const userApiKey = req.headers.get('X-API-Key');

        if (!userApiKey) {
            return new Response(JSON.stringify({ error: 'No OpenAI API key set. Click the logo in the top right and add yours to get started.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const openai = new OpenAI({ apiKey: userApiKey });

        const messages = [
            {
                role: 'system',
                content: systemPrompt 
            },
            {
                role: 'user',
                content: `Template Name: ${templateName}\n\nExpected Template:\n\`\`\`python\n${expectedTemplate}\n\`\`\`\n\nUser's Code:\n\`\`\`python\n${userCode}\n\`\`\`\n\nDoes the user's code correctly implement this template pattern? Respond with JSON only.`
            }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-5.2',
            max_completion_tokens: 500,
            messages,
        });

        const content = response.choices[0].message.content;

        // Parse the JSON response
        let result;
        try {
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                result = JSON.parse(content);
            }
        } catch (parseError) {
            // If parsing fails, try to infer from content
            const passed = content.toLowerCase().includes('passed": true') ||
                          (content.toLowerCase().includes('correct') && !content.toLowerCase().includes('incorrect'));
            result = {
                passed: passed,
                feedback: content
            };
        }

        mixpanel.track('Code Graded', {
            distinct_id: 'anonymous',
            templateName,
            userCode,
            expectedTemplate,
            userCodeLength: userCode.length,
            expectedTemplateLength: expectedTemplate.length,
            prompt: JSON.stringify(messages),
            output: content,
            passed: result.passed,
            feedback: result.feedback,
        });

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in grade API:', error);

        mixpanel.track('Grading Error', {
            distinct_id: 'anonymous',
            error: error.message || 'Unknown error',
        });

        return new Response(JSON.stringify({
            error: error.message || 'An error occurred during grading',
            passed: false,
            feedback: 'Error occurred during grading. Please try again.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
