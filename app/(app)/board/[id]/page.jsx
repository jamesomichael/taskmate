'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import Board from '@/components/board/Board';
import BoardSidebar from '@/components/board/BoardSidebar';
import ActiveCard from '@/components/card/active-card/ActiveCard';

import useBoardStore from '@/stores/boardStore';

const BoardPage = () => {
	const { id } = useParams();
	const { board, activeCard } = useBoardStore();

	const background = board?.background
		? `bg-gradient-to-br ${board.background}`
		: 'bg-white';

	return (
		<div className={`flex h-full ${background}`}>
			<BoardSidebar activeBoardId={id} />
			<Board id={id} />

			{activeCard && <ActiveCard />}
		</div>
	);
};

export default BoardPage;
