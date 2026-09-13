import NavLinks from './NavLinks';

function formatToday(): string {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date());
}

export default function Header() {
	return (
		<header className="border-b border-line bg-surface/90">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
						Sacrament meetings
					</p>
					<div className="mt-1 flex items-baseline gap-3">
						<p className="font-serif text-2xl font-semibold tracking-tight text-foreground">
							Cedar Grove Ward
						</p>
						<span className="hidden text-sm text-ink-muted sm:inline">Ward record</span>
					</div>
				</div>
				<div className="flex flex-col gap-3 sm:items-end">
					<p className="text-xs font-medium text-ink-muted">{formatToday()}</p>
					<NavLinks />
				</div>
			</div>
		</header>
	);
}
