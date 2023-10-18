import { json } from '@sveltejs/kit';
import { auth } from 'lib/auth';

export async function GET({ locals }) {
	const session = await locals.auth.validate();
	if (!session) {
		return json({ error: 'Unauthorized' });
	}

	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);
    
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}
