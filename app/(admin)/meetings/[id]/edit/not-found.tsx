import Link from 'next/link';

export default function EditMeetingNotFound() {
	return (
		<div className="mx-auto w-full max-w-4xl px-5 py-16 lg:px-8">
			<h1 className="font-serif text-3xl font-semibold">Meeting not found</h1>
			<p className="mt-3 text-ink-muted">This meeting may have been removed or the address may be incorrect.</p>
			<Link className="mt-6 inline-block font-semibold text-accent underline" href="/meetings">Back to meetings</Link>
		</div>
	);
}