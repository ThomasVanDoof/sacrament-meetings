'use client';

import { useActionState } from 'react';
import { login } from '@/lib/auth-actions';

interface LoginFormProps {
	callbackUrl?: string;
}

export default function LoginForm({ callbackUrl }: LoginFormProps) {
	const [state, formAction, isPending] = useActionState(login, {});

	return (
		<form action={formAction} className="mt-8 space-y-5">
			<input type="hidden" name="callbackUrl" value={callbackUrl ?? '/meetings/new'} />
			<div>
				<label className="font-medium" htmlFor="username">Username</label>
				<input
					autoComplete="username"
					className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-foreground outline-none focus:border-accent"
					id="username"
					name="username"
					required
				/>
			</div>
			<div>
				<label className="font-medium" htmlFor="password">Password</label>
				<input
					autoComplete="current-password"
					className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-foreground outline-none focus:border-accent"
					id="password"
					name="password"
					required
					type="password"
				/>
			</div>
			{state.error && <p aria-live="polite" className="text-sm text-red-700">{state.error}</p>}
			<button
				className="w-full rounded-lg bg-accent px-5 py-3 font-semibold text-white disabled:opacity-60"
				disabled={isPending}
				type="submit"
			>
				{isPending ? 'Signing in...' : 'Sign in'}
			</button>
		</form>
	);
}