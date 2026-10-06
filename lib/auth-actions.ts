'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function login(
	_previousState: { error?: string },
	formData: FormData,
): Promise<{ error?: string }> {
	const callbackUrl = formData.get('callbackUrl');
	const redirectTo =
		typeof callbackUrl === 'string' && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')
			? callbackUrl
			: '/meetings/new';

	try {
		await signIn('credentials', {
			username: formData.get('username'),
			password: formData.get('password'),
			redirectTo,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: 'Invalid username or password.' };
		}

		throw error;
	}

	return { error: 'Unable to sign in. Please try again.' };
}

export async function logout(): Promise<void> {
	await signOut({ redirectTo: '/login' });
}