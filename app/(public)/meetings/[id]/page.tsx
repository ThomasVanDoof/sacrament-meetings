import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { parseMeetingId } from '@/lib/meeting-input';
import { notFound } from 'next/navigation';

interface MeetingPageProps {
	params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
	const { id } = await params;
	const meetingId = parseMeetingId(id);
	const meeting = meetingId === null ? null : await getMeetingById(meetingId);

	if (!meeting) notFound();

	return (
		<div className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
			<MeetingDetail meeting={meeting} />
		</div>
	);
}