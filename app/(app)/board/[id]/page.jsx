'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import Board from '@/components/Board';
import BoardSidebar from '@/components/BoardSidebar';
import ActiveCard from '@/components/ActiveCard';

import useBoardStore from '@/stores/boardStore';

const BoardPage = () => {
	const { id } = useParams();
	const { board } = useBoardStore();

	const background = board?.background
		? `bg-gradient-to-br ${board.background}`
		: 'bg-white';

	return (
		<div className={`flex h-full ${background}`}>
			<BoardSidebar activeBoardId={id} />
			<Board id={id} />

			<ActiveCard />
		</div>
	);
};

export default BoardPage;
