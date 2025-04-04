import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import useBoardStore from '@/stores/boardStore';

const ActiveCardTimestamps = () => {
	const { activeCard } = useBoardStore();

	return (
		<div className="w-full flex flex-col gap-1 text-center md:text-left">
			<span className="w-full font-copy text-xs truncate">
				Created&nbsp;
				<span
					title={dayjs(activeCard.created_at).toDate().toString()}
					className="font-semibold"
				>
					{dayjs(activeCard.created_at).fromNow()}
				</span>
			</span>
			{activeCard.updated_at && (
				<span className="w-full font-copy text-xs truncate">
					Updated&nbsp;
					<span
						title={dayjs(activeCard.updated_at).toDate().toString()}
						className="font-semibold"
					>
						{dayjs(activeCard.updated_at).fromNow()}
					</span>
				</span>
			)}
		</div>
	);
};

export default ActiveCardTimestamps;
