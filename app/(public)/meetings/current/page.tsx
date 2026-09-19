import { getMeetings } from '@/lib/meetings-db';
import { redirect } from 'next/navigation';

function getToday(): string {
	const today = new Date();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${today.getFullYear()}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
	const meetings = await getMeetings();
	const today = getToday();
	const sortedMeetings = [...meetings].sort((left, right) => left.date.localeCompare(right.date));
	const meeting = sortedMeetings.find((item) => item.date >= today) ?? sortedMeetings.at(-1);

	if (meeting) {
		redirect(`/meetings/${meeting.id}`);
	}

	redirect('/meetings');
}