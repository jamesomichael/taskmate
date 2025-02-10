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
				className={'antialiased min-h-screen h-screen w-full bg-white'}
			>
				<div className="select-none h-12 border-b-[1px] border-gray-300">
					<Navbar />
				</div>
				{children}
			</body>
		</html>
	);
}
