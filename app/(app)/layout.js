import '../globals.css';

import Navbar from '@/components/Navbar';

export const metadata = {
	title: 'taskmate',
	description: 'A task management app.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={
					'antialiased min-h-screen h-screen w-full bg-neutral-800'
				}
			>
				<div className="h-12">
					<Navbar />
				</div>
				{children}
			</body>
		</html>
	);
}
