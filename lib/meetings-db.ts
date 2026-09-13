import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
	{
		id: 1,
		date: '2026-05-03',
		meetingType: 'regular',
		presiding: 'Bishop Smith',
		conducting: 'Brother Jones',
		openingHymn: { number: 2, title: 'The Spirit of God' },
		openingPrayer: 'Sister Williams',
		wardBusiness: [{ description: 'Sustaining of new Primary president' }],
		stakeBusiness: false,
		sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
		speakers: [
			{ name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
			{ name: 'Youth Choir', topic: '', type: 'musical-number' },
		],
		closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
		closingPrayer: 'Brother Davis',
		announcements: ['Ward temple night: May 10'],
	},
	{
		id: 2,
		date: '2026-05-10',
		meetingType: 'testimony',
		presiding: 'Bishop Smith',
		conducting: 'Sister Carter',
		openingHymn: { number: 85, title: 'How Firm a Foundation' },
		openingPrayer: 'Brother Miller',
		wardBusiness: [],
		stakeBusiness: false,
		sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
		speakers: [],
		closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
		closingPrayer: 'Sister Green',
		announcements: ['Youth activity: May 13 at 6:30 PM'],
	},
	{
		id: 3,
		date: '2026-05-17',
		meetingType: 'regular',
		presiding: 'President Anderson',
		conducting: 'Brother Jones',
		openingHymn: { number: 81, title: 'Press Forward, Saints' },
		openingPrayer: 'Sister Lee',
		wardBusiness: [{ description: 'Calling of a new ward music chair' }],
		stakeBusiness: false,
		sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
		speakers: [
			{ name: 'Brother Davis', topic: 'Ministering with Charity', type: 'speaker' },
			{ name: 'Sister Wilson', topic: 'Finding Peace through Prayer', type: 'speaker' },
		],
		closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
		closingPrayer: 'Brother Miller',
	},
	{
		id: 4,
		date: '2026-05-24',
		meetingType: 'stake',
		presiding: 'President Anderson',
		conducting: 'President Clark',
		openingHymn: { number: 27, title: 'Praise to the Man' },
		openingPrayer: 'Sister Taylor',
		wardBusiness: [],
		stakeBusiness: true,
		sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
		speakers: [
			{ name: 'Elder Robinson', topic: 'Covenants and Discipleship', type: 'speaker' },
			{ name: 'Sister Clark', topic: 'Strengthening Families', type: 'speaker' },
		],
		closingHymn: { number: 220, title: 'Lord, I Would Follow Thee' },
		closingPrayer: 'Brother Harris',
		announcements: ['Stake youth conference registration is open'],
	},
	{
		id: 5,
		date: '2026-05-31',
		meetingType: 'regular',
		presiding: 'Bishop Smith',
		conducting: 'Sister Carter',
		openingHymn: { number: 98, title: 'I Need Thee Every Hour' },
		openingPrayer: 'Brother Davis',
		wardBusiness: [{ description: 'Sustaining of new Sunday School secretary' }],
		stakeBusiness: false,
		sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
		speakers: [
			{ name: 'Sister Brown', topic: 'The Gift of the Holy Ghost', type: 'speaker' },
			{ name: 'Primary Children', topic: '', type: 'musical-number' },
		],
		closingHymn: { number: 301, title: 'I Am a Child of God' },
		closingPrayer: 'Sister Williams',
		announcements: ['Fast Sunday food drive: June 7'],
	},
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
	if (date) {
		return meetings.filter((meeting) => meeting.date === date);
	}

	return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
	return meetings.find((meeting) => meeting.id === id) ?? null;
}
