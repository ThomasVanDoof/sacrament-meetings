import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
	title: 'Admin Login',
	description: 'Sign in to manage sacrament meeting agendas.',
};

interface LoginPageProps {
	searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const { callbackUrl } = await searchParams;

	return (
		<div className="mx-auto w-full max-w-md px-5 py-16 lg:py-24">
			<p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Meeting planner</p>
			<h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Admin login</h1>
			<p className="mt-3 text-ink-muted">Sign in to create and update meeting agendas.</p>
			<LoginForm callbackUrl={callbackUrl} />
		</div>
	);
}