import './globals.css';

export const metadata = {
	title: 'taskmate',
	description: 'A task management app.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={'antialiased min-h-screen h-screen w-full'}>
				{children}
			</body>
		</html>
	);
}
