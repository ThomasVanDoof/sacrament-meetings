import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login?callbackUrl=%2Fmeetings%2Fnew');
	}

	return session.user;
}