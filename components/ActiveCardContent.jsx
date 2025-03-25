import React from 'react';
import dayjs from 'dayjs';

import ActiveCardDescription from './ActiveCardDescription';
import ActiveCardActions from './ActiveCardActions';
import ActiveCardComments from './ActiveCardComments';

import useBoardStore from '@/stores/boardStore';

const ActiveCardContent = () => {
	const { activeCard } = useBoardStore();

	return (
		<div className="grid grid-rows-[1fr,auto] md:grid-rows-none md:grid-cols-[1fr,auto] gap-8 md:gap-4">
			<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-6 gap-y-3">
				<ActiveCardDescription />
				<ActiveCardComments />
			</div>
			<div className="w-44 flex flex-col gap-4 md:gap-6">
				<ActiveCardActions />
				<div className="flex flex-col gap-1 truncate">
					<span className="font-copy text-xs truncate">
						Created&nbsp;
						<span className="font-semibold">
							{dayjs(activeCard.created_at).format(
								'D MMM YYYY, HH:mm'
							)}
						</span>
					</span>
					{/* <span className="font-copy text-xs truncate">
						Modified&nbsp;
						<span className="font-semibold">
							{dayjs(activeCard.created_at).format(
								'D MMM YYYY, HH:mm'
							)}
						</span>
					</span> */}
				</div>
			</div>
		</div>
	);
};

export default ActiveCardContent;
