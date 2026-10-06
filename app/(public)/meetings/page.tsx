import type { Metadata } from 'next';
import { auth } from '@/auth';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import { MeetingSearch } from '@/components/MeetingSearch';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export const metadata: Metadata = {
	title: 'Meeting Archive',
	description: 'Browse and search the complete record of Cedar Grove Ward sacrament meeting agendas.',
};

export default async function MeetingsPage(props: {
	searchParams?: Promise<{ query?: string; page?: string }>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query ?? '';
	const currentPage = Math.max(Number(searchParams?.page) || 1, 1);
	const [meetings, totalPages, session] = await Promise.all([
		getMeetings(query, null, currentPage),
		getMeetingsTotalPages(query),
		auth(),
	]);

	return (
		<div className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
			<div className="max-w-2xl">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Meeting archive</p>
				<h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">All meetings</h1>
				<p className="mt-4 text-lg leading-8 text-ink-muted">Browse the complete record of Cedar Grove Ward agendas.</p>
			</div>
			<div className="mt-8 max-w-xl">
				<MeetingSearch />
			</div>
			<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} canManage={Boolean(session?.user)} />)}
			</div>
			<Pagination totalPages={totalPages} />
		</div>
	);
}