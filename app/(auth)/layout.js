import '../globals.css';

export const metadata = {
	title: 'taskmate - A task management app',
	description: 'A task management app.',
};

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body className={'antialiased min-h-screen h-screen w-full'}>
				{children}
			</body>
		</html>
	);
}
