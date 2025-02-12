'use client';
import React from 'react';

import Lists from './Lists';

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
		</div>
	);
};

export default Board;
