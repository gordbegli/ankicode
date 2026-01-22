import OpenAI from 'openai';

export async function POST(req) {
    try {
        const { userCode, expectedTemplate, templateName } = await req.json();
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
            model: 'gpt-5.2',
            max_completion_tokens: 500,
            messages: [
                {
                    role: 'system',
                    content: `You are a code grader for algorithm templates. Your job is to determine if the user's code correctly implements the expected template pattern.

IMPORTANT: Be lenient about minor differences like:
- Variable names (e.g., 'ans' vs 'result', 'i' vs 'left')
- Inconsistent variable names when the intent is clear (e.g., defining variables as 'l'/'r' but updating 'left'/'right', or using 'mid'/'m' interchangeably). Treat these as if the user meant the correct variable.
- Extra helper code or comments
- Slight structural variations that still follow the same pattern
- Typos (e.g. appned vs append)
- Deviations in returned values. It is okay if the user returns null if the core logic is correct.
- Spacing typos in operators (e.g. r =- 1 instead of r -= 1, or l =+ 1 instead of l += 1)
- Missing parentheses for class instantiation (e.g., TrieNode instead of TrieNode())

Be STRICT about incorrect logic:
- Wrong index calculations (e.g. m = arr[(r-l)//2] is WRONG, should be m = arr[(l+r)//2])

Focus on whether the core algorithm pattern is correctly implemented.

Respond in this exact JSON format:
{
    "passed": true/false,
    "feedback": "Brief explanation (1-2 sentences)"
}`
                },
                {
                    role: 'user',
                    content: `Template Name: ${templateName}

Expected Template:
\`\`\`python
${expectedTemplate}
\`\`\`

User's Code:
\`\`\`python
${userCode}
\`\`\`

Does the user's code correctly implement this template pattern? Respond with JSON only.`
                }
            ],
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

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in grade API:', error);
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
