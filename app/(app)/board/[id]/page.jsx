import React from 'react';

import Board from '@/components/Board';

const BoardPage = async ({ params }) => {
	const { id } = await params;
	return <Board id={id} />;
};

export default BoardPage;
