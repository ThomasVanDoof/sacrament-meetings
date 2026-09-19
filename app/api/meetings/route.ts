import { getMeetings } from '@/lib/meetings-db';
import { isMeetingDate } from '@/lib/meeting-input';
import type { SacramentMeeting } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

type MeetingsResponse = SacramentMeeting[] | { error: string };

export async function GET(request: NextRequest): Promise<NextResponse<MeetingsResponse>> {
	const date = request.nextUrl.searchParams.get('date');

	if (date !== null && !isMeetingDate(date)) {
		return NextResponse.json({ error: 'Date must use YYYY-MM-DD format' }, { status: 400 });
	}

	return NextResponse.json(await getMeetings(undefined, date));
}
