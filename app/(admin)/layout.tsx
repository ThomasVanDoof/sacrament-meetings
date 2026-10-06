import type { ReactNode } from 'react';
import { logout } from '@/lib/auth-actions';
import { requireAdmin } from '@/lib/auth-guard';

interface AdminLayoutProps {
	children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const user = await requireAdmin();

	return (
		<>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 px-5 pt-5 lg:px-8">
				<span className="text-sm text-ink-muted">Signed in as {user.name ?? 'admin'}</span>
				<form action={logout}>
					<button className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted" type="submit">
						Sign out
					</button>
				</form>
			</div>
			{children}
		</>
	);
}