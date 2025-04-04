'use client';
import React, { useEffect } from 'react';

import CreateBoardButton from './CreateBoardButton';
import SidebarBoardsList from './SidebarBoardsList';

import useBoardStore from '@/stores/boardStore';

const BoardSidebar = ({ activeBoardId }) => {
	const { boards, getBoards } = useBoardStore();

	useEffect(() => {
		getBoards();
	}, [getBoards]);

	const sortedBoards = [...boards].sort(
		(a, b) => Number(b.is_starred) - Number(a.is_starred)
	);

	if (boards.length === 0) {
		return null;
	}

	return (
		<div
			className={`bg-black bg-opacity-60 hidden sm:block sm:min-w-72 sm:w-72 border-r-[1px] border-neutral-500`}
		>
			<div className="flex flex-col text-white">
				<div className="mt-2 px-4 py-2 flex justify-between items-center">
					<span className="font-copy font-bold">Your boards</span>
					<CreateBoardButton className="-mr-1 aspect-square hover:bg-white hover:bg-opacity-40 h-6 flex justify-center items-center rounded">
						<span className="font-copy text-xl">+</span>
					</CreateBoardButton>
				</div>
				<SidebarBoardsList
					activeBoardId={activeBoardId}
					boards={sortedBoards}
				/>
			</div>
		</div>
	);
};

export default BoardSidebar;
