import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { parseMeetingId } from '@/lib/meeting-input';
import { notFound } from 'next/navigation';

interface EditMeetingPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
	const { id } = await params;
	const meetingId = parseMeetingId(id);
	if (meetingId === null) notFound();

	const meeting = await getMeetingById(meetingId);
	if (!meeting) notFound();

	return (
		<div className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
			<p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Meeting planner</p>
			<h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Edit meeting</h1>
			<MeetingForm meeting={meeting} />
		</div>
	);
}