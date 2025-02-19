import React from 'react';

import Board from '@/components/Board';
import BoardSidebar from '@/components/BoardSidebar';

const BoardPage = async ({ params }) => {
	const { id } = await params;
	return (
		<div className="flex h-full">
			<BoardSidebar activeBoardId={id} />
			<Board id={id} />
		</div>
	);
};

export default BoardPage;
