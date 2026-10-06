import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			authorize(credentials) {
				const username = credentials.username;
				const password = credentials.password;
				const configuredUsername = process.env.ADMIN_USERNAME;
				const configuredPassword = process.env.ADMIN_PASSWORD;

				if (
					typeof username !== 'string' ||
					typeof password !== 'string' ||
					!configuredUsername ||
					!configuredPassword ||
					username !== configuredUsername ||
					password !== configuredPassword
				) {
					return null;
				}

				return { id: 'admin', name: configuredUsername };
			},
		}),
	],
	pages: { signIn: '/login' },
	session: { strategy: 'jwt' },
});