'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Math.min(Math.max(Number(searchParams.get('page')) || 1, 1), totalPages);

	function createPageURL(page: number) {
		const params = new URLSearchParams(searchParams);
		params.set('page', String(page));
		return `${pathname}?${params.toString()}`;
	}

	if (totalPages <= 1) {
		return null;
	}

	return (
		<nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
			{currentPage > 1 ? (
				<Link
					href={createPageURL(currentPage - 1)}
					className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
				>
					Previous
				</Link>
			) : (
				<span className="px-4 py-2 text-sm text-ink-muted" aria-hidden="true">Previous</span>
			)}
			<span className="text-sm font-medium text-ink" aria-current="page">
				Page {currentPage} of {totalPages}
			</span>
			{currentPage < totalPages ? (
				<Link
					href={createPageURL(currentPage + 1)}
					className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
				>
					Next
				</Link>
			) : (
				<span className="px-4 py-2 text-sm text-ink-muted" aria-hidden="true">Next</span>
			)}
		</nav>
	);
}