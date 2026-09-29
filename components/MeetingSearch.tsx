'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { push } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', '1');

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		push(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<input
			type="search"
			placeholder="Search by speaker, leader, or meeting type..."
			defaultValue={searchParams.get('query') ?? ''}
			onChange={(event) => handleSearch(event.target.value)}
			aria-label="Search meetings"
			className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
		/>
	);
}