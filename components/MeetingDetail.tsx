import type { Hymn, SacramentMeeting, SpeakerItem, WardBusinessItem } from '@/lib/types';

interface MeetingDetailProps {
	meeting: SacramentMeeting;
}

function AgendaRow({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
			<dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</dt>
			<dd className="text-base text-foreground">{children}</dd>
		</div>
	);
}

function HymnLine({ hymn }: { hymn: Hymn }) {
	return (
		<span>
			<span className="font-semibold text-accent">#{hymn.number}</span> {hymn.title}
		</span>
	);
}

function SpeakerLine({ speaker }: { speaker: SpeakerItem }) {
	const topic = speaker.topic?.trim();

	return (
		<li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
			<span className="font-medium">{speaker.name}</span>
			{topic && <span className="text-ink-muted">{topic}</span>}
		</li>
	);
}

function BusinessList({ items = [] }: { items?: WardBusinessItem[] }) {
	if (items.length === 0) return <span className="text-ink-muted">None listed</span>;

	return (
		<ul className="list-inside list-disc space-y-1">
			{items.map((item) => <li key={item.description}>{item.description}</li>)}
		</ul>
	);
}

function formatMeetingDate(date: string): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(`${date}T12:00:00`));
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
	const wardBusiness = meeting.wardBusiness ?? [];
	const speakers = meeting.speakers ?? [];
	const announcements = meeting.announcements ?? [];

	return (
		<section aria-labelledby="meeting-detail-title" className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
			<div className="border-b border-line pb-6">
				<p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{formatMeetingDate(meeting.date)}</p>
				<h1 id="meeting-detail-title" className="mt-2 font-serif text-3xl font-semibold capitalize tracking-tight">
					{meeting.meetingType} meeting
				</h1>
				<p className="mt-2 text-ink-muted">Presiding: {meeting.presiding} · Conducting: {meeting.conducting}</p>
			</div>

			<dl className="mt-2">
				<AgendaRow label="Opening hymn"><HymnLine hymn={meeting.openingHymn} /></AgendaRow>
				<AgendaRow label="Opening prayer">{meeting.openingPrayer}</AgendaRow>
				<AgendaRow label="Ward business"><BusinessList items={wardBusiness} /></AgendaRow>
				<AgendaRow label="Stake business">{meeting.stakeBusiness ? 'Yes' : 'None listed'}</AgendaRow>
				<AgendaRow label="Sacrament hymn"><HymnLine hymn={meeting.sacramentHymn} /></AgendaRow>
				<AgendaRow label="Speakers">
					{speakers.length > 0 ? (
						<ul className="space-y-3"><>{speakers.map((speaker) => <SpeakerLine key={`${speaker.name}-${speaker.topic}`} speaker={speaker} />)}</></ul>
					) : <span className="text-ink-muted">Open testimony meeting</span>}
				</AgendaRow>
				<AgendaRow label="Closing hymn"><HymnLine hymn={meeting.closingHymn} /></AgendaRow>
				<AgendaRow label="Closing prayer">{meeting.closingPrayer}</AgendaRow>
				<AgendaRow label="Announcements">
					{announcements.length ? (
						<ul className="list-inside list-disc space-y-1">{announcements.map((announcement) => <li key={announcement}>{announcement}</li>)}</ul>
					) : <span className="text-ink-muted">None listed</span>}
				</AgendaRow>
			</dl>
		</section>
	);
}
