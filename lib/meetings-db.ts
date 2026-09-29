import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);
const MEETINGS_PER_PAGE = 6;

export async function getMeetings(query?: string | null, date?: string | null, page = 1): Promise<SacramentMeeting[]> {
	const searchTerm = query?.trim() ?? '';
	const offset = (Math.max(page, 1) - 1) * MEETINGS_PER_PAGE;
	const rows = date
		? await sql`
			SELECT id, date::text AS date, meeting_type AS "meetingType", presiding, conducting,
				announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
				ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
				sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
				closing_prayer AS "closingPrayer"
			FROM meetings
			WHERE date = ${date}
			ORDER BY date
			LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}
		`
		: searchTerm
		? await sql`
			SELECT id, date::text AS date, meeting_type AS "meetingType", presiding, conducting,
				announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
				ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
				sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
				closing_prayer AS "closingPrayer"
			FROM meetings
			WHERE CONCAT_WS(' ', date::text, meeting_type, presiding, conducting,
				announcements::text, speakers::text, ward_business::text) ILIKE ${`%${searchTerm}%`}
			ORDER BY date
			LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}
		`
		: await sql`
			SELECT id, date::text AS date, meeting_type AS "meetingType", presiding, conducting,
				announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
				ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
				sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
				closing_prayer AS "closingPrayer"
			FROM meetings
			ORDER BY date
			LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}
		`;

	return rows as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query?: string | null): Promise<number> {
	const searchTerm = query?.trim() ?? '';
	const rows = searchTerm
		? await sql`
			SELECT COUNT(*)::int AS count
			FROM meetings
			WHERE CONCAT_WS(' ', date::text, meeting_type, presiding, conducting,
				announcements::text, speakers::text, ward_business::text) ILIKE ${`%${searchTerm}%`}
		`
		: await sql`SELECT COUNT(*)::int AS count FROM meetings`;

	return Math.ceil(Number(rows[0]?.count ?? 0) / MEETINGS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
	const rows = await sql`
		SELECT id, date::text AS date, meeting_type AS "meetingType", presiding, conducting,
			announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
			ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
			sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn",
			closing_prayer AS "closingPrayer"
		FROM meetings
		WHERE id = ${id}
	`;

	return (rows[0] as SacramentMeeting | undefined) ?? null;
}

export async function addMeeting(meeting: Omit<SacramentMeeting, 'id'>): Promise<void> {
	await sql`
		INSERT INTO meetings (
			date, meeting_type, presiding, conducting, announcements, opening_hymn,
			opening_prayer, ward_business, stake_business, sacrament_hymn, speakers,
			closing_hymn, closing_prayer
		)
		VALUES (
			${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting},
			${JSON.stringify(meeting.announcements ?? [])}::jsonb,
			${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer},
			${JSON.stringify(meeting.wardBusiness)}::jsonb, ${meeting.stakeBusiness},
			${JSON.stringify(meeting.sacramentHymn)}::jsonb, ${JSON.stringify(meeting.speakers)}::jsonb,
			${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
		)
	`;
}

export async function updateMeeting(id: number, meeting: Omit<SacramentMeeting, 'id'>): Promise<void> {
	await sql`
		UPDATE meetings
		SET date = ${meeting.date}, meeting_type = ${meeting.meetingType},
			presiding = ${meeting.presiding}, conducting = ${meeting.conducting},
			announcements = ${JSON.stringify(meeting.announcements ?? [])}::jsonb,
			opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
			opening_prayer = ${meeting.openingPrayer},
			ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
			stake_business = ${meeting.stakeBusiness},
			sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
			speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
			closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
			closing_prayer = ${meeting.closingPrayer}
		WHERE id = ${id}
	`;
}

export async function deleteMeeting(id: number): Promise<void> {
	await sql`DELETE FROM meetings WHERE id = ${id}`;
}
