'use client';
import React from 'react';

import Lists from './Lists';
// import List from '@/components/List';
// import AddList from '@/components/AddList';

const Board = ({ board, lists }) => {
	return (
		<div
			className={`grid grid-rows-[auto,1fr] bg-gradient-to-br ${board.background} h-full overflow-hidden w-full`}
		>
			<div className="h-14 bg-black bg-opacity-45 flex items-center px-4">
				<span className="font-copy font-semibold text-white text-lg">
					{board.name}
				</span>
			</div>
			<Lists board={board} lists={lists} />
			{/* <div className="p-3 flex gap-3 w-full overflow-x-scroll">
				{lists.map((list) => (
					<div>{list.id}</div>
					// <List boardId={board.id} list={list} />
				))}
				<AddList boardId={board.id} onCreate={handleListCreation} />
			</div> */}
		</div>
	);
};

export default Board;
