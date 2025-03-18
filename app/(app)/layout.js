import '../globals.css';

import Navbar from '@/components/Navbar';

import { createClient } from '@/utils/supabase/server';

export const metadata = {
	title: 'taskmate',
	description: 'A task management app.',
	icons: {
		icon: '/favicon-96x96.png',
		apple: '/apple-icon-180x180.png',
		android: '/android-icon-192x192.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/apple-icon-precomposed.png',
		},
	},
};

export default async function RootLayout({ children }) {
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();
	const user = data.user;

	return (
		<html lang="en">
			<body
				className={
					'select-none antialiased min-h-screen h-screen w-full grid grid-rows-[auto,1fr] bg-white'
				}
			>
				<div className="h-12">
					<Navbar user={user} />
				</div>
				<div className="overflow-auto">{children}</div>
			</body>
		</html>
	);
}
