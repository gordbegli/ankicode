import OpenAI from 'openai';
import Mixpanel from 'mixpanel';

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
                content: `You are a code grader for algorithm templates. Your job is to determine if the user's code matches the expected template pattern.

IMPORTANT: The expected template may contain placeholder comments (e.g., "#update curr", "#logic"). If the template has a placeholder comment, the user's code should have the same or similar placeholder comment in the same location - this is CORRECT and should PASS.

Be lenient about minor differences like:
- Variable names (e.g., 'ans' vs 'result', 'i' vs 'left')
- Inconsistent variable names when the intent is clear (e.g., defining variables as 'l'/'r' but updating 'left'/'right', or using 'mid'/'m' interchangeably). Treat these as if the user meant the correct variable.
- Extra helper code or comments
- Slight structural variations that still follow the same pattern
- Typos (e.g. appned vs append)
- Deviations in returned values. It is okay if the user returns null if the core logic is correct.
- Spacing typos in operators (e.g. r =- 1 instead of r -= 1, or l =+ 1 instead of l += 1)
- Missing parentheses for class instantiation (e.g., TrieNode instead of TrieNode())
- Naming of uninitialized values. E.g. using 'start' instead of 'START_NODE'.
- Abbreviated comments (e.g. "#logic" vs "#logic to update curr")
- Missing answer variables (ans, result, etc.) when the core algorithmic structure is correctly implemented
- Missing placeholder comments when the user has implemented the correct algorithmic pattern
- Tuple/pair unpacking order differences (e.g. "for edge, nei in graph[node]" vs "for nei, weight in graph[node]") as long as the variables are used consistently with their intended meaning
- Variable name typos where the intent is obvious (e.g. "cust_dist" instead of "curr_dist", "neigbor" instead of "neighbor")

Be STRICT about incorrect logic:
- Wrong index calculations (e.g. m = arr[(r-l)//2] is WRONG, should be m = arr[(l+r)//2])

Focus on whether the user's code matches the template pattern structure, NOT on whether the algorithm is fully implemented when the template itself has placeholders.

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
