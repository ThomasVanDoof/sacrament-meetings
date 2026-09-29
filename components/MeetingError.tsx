'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MeetingErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function MeetingError({ error, reset }: MeetingErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="mx-auto w-full max-w-4xl px-5 py-16 lg:px-8">
			<h2 className="font-serif text-3xl font-semibold">We could not load the meetings</h2>
			<p className="mt-3 text-ink-muted">Something went wrong while loading this page.</p>
			<div className="mt-6 flex flex-wrap gap-4">
				<button className="rounded-lg bg-accent px-4 py-2 font-semibold text-white" onClick={reset} type="button">Try Again</button>
				<Link className="px-2 py-2 font-semibold text-accent underline" href="/meetings">Back to meetings</Link>
			</div>
		</div>
	);
}