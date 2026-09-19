export default function MeetingsLoading() {
	return (
		<div className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8 lg:py-16" aria-busy="true">
			<div className="h-4 w-32 animate-pulse rounded bg-surface-muted" />
			<div className="mt-4 h-10 w-64 animate-pulse rounded bg-surface-muted" />
			<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3].map((item) => (
					<div key={item} className="h-48 animate-pulse rounded-2xl border border-line bg-surface" />
				))}
			</div>
		</div>
	);
}