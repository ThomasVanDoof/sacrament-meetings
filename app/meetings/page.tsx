import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default function MeetingsPage() {
	const meetings = getMeetings();

	return (
		<div className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
			<div className="max-w-2xl">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Meeting archive</p>
				<h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">All meetings</h1>
				<p className="mt-4 text-lg leading-8 text-ink-muted">Browse the complete record of Cedar Grove Ward agendas.</p>
			</div>
			<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
			</div>
		</div>
	);
}
