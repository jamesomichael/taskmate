import React from 'react';
import dayjs from 'dayjs';

import useBoardStore from '@/stores/boardStore';

const ActiveCardTimestamps = () => {
	const { activeCard } = useBoardStore();

	return (
		<div className="flex flex-col items-center md:items-start gap-1 truncate">
			<span className="font-copy text-xs truncate">
				Created&nbsp;
				<span className="font-semibold">
					{dayjs(activeCard.created_at).format('D MMM YYYY, HH:mm')}
				</span>
			</span>
			{activeCard.updated_at && (
				<span className="font-copy text-xs truncate">
					Modified&nbsp;
					<span className="font-semibold">
						{dayjs(activeCard.updated_at).format(
							'D MMM YYYY, HH:mm'
						)}
					</span>
				</span>
			)}
		</div>
	);
};

export default ActiveCardTimestamps;
