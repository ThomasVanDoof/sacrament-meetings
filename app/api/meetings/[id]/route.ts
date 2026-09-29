import { getMeetingById } from '@/lib/meetings-db';
import { parseMeetingId } from '@/lib/meeting-input';
import type { SacramentMeeting } from '@/lib/types';
import { NextResponse } from 'next/server';

interface MeetingRouteContext {
	params: Promise<{ id: string }>;
}

type MeetingResponse = SacramentMeeting | { error: string };

export async function GET(
	_request: Request,
	{ params }: MeetingRouteContext,
): Promise<NextResponse<MeetingResponse>> {
	const { id } = await params;
	const meetingId = parseMeetingId(id);

	if (meetingId === null) {
		return NextResponse.json({ error: 'Meeting ID must be a positive integer' }, { status: 400 });
	}

	const meeting = await getMeetingById(meetingId);

	if (!meeting) {
		return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
	}

	return NextResponse.json(meeting);
}
