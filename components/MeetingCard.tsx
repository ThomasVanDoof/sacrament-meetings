import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
	meeting: SacramentMeeting;
}

function formatDate(date: string): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(`${date}T12:00:00`));
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
	const speakerCount = meeting.speakers.filter((item) => item.type === 'speaker').length;

	return (
		<Link
			href={`/meetings/${meeting.id}`}
			className="group block rounded-2xl border border-line bg-surface p-5 shadow-[0_8px_24px_rgba(57,45,28,0.05)] transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_12px_30px_rgba(57,45,28,0.1)]"
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-accent">{formatDate(meeting.date)}</p>
					<h2 className="mt-2 font-serif text-xl font-semibold capitalize text-foreground">
						{meeting.meetingType} meeting
					</h2>
				</div>
				<span className="text-xl text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
					&rarr;
				</span>
			</div>
			<dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
				<div>
					<dt className="text-ink-muted">Presiding</dt>
					<dd className="mt-1 font-medium text-foreground">{meeting.presiding}</dd>
				</div>
				<div>
					<dt className="text-ink-muted">Program</dt>
					<dd className="mt-1 font-medium text-foreground">{speakerCount} speakers</dd>
				</div>
			</dl>
		</Link>
	);
}
