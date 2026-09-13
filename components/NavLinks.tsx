'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links: { href: string; label: string }[] = [
	{ href: '/', label: 'Overview' },
	{ href: '/meetings', label: 'Meetings' },
	{ href: '/meetings/current', label: 'Current agenda' },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<nav aria-label="Main navigation" className="flex items-center gap-1">
			{links.map((link) => {
				const isActive =
					link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

				return (
					<Link
						key={link.href}
						href={link.href}
						className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
							isActive
								? 'bg-accent-soft text-accent-dark'
								: 'text-ink-muted hover:bg-surface-muted hover:text-foreground'
						}`}
						aria-current={isActive ? 'page' : undefined}
					>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
