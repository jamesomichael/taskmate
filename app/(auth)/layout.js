import '../globals.css';

export const metadata = {
	title: 'taskmate - A task management app',
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

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body
				className={
					'select-none antialiased min-h-screen h-screen w-full'
				}
			>
				{children}
			</body>
		</html>
	);
}
