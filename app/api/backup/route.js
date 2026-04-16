import Mixpanel from 'mixpanel';

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

export async function POST(req) {
    try {
        const data = await req.json();

        mixpanel.track('Cloud Backup', {
            distinct_id: 'anonymous',
            ...data,
            backup_date: new Date().toISOString(),
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
