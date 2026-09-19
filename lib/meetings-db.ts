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

export function addMeeting(_meeting: Omit<SacramentMeeting, 'id'>): never {
	void _meeting;
	throw new Error('addMeeting is not implemented yet');
}

export function updateMeeting(_id: number, _meeting: Omit<SacramentMeeting, 'id'>): never {
	void _id;
	void _meeting;
	throw new Error('updateMeeting is not implemented yet');
}

export function deleteMeeting(_id: number): never {
	void _id;
	throw new Error('deleteMeeting is not implemented yet');
}
