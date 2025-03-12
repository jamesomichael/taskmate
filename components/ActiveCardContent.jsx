import React from 'react';

import ActiveCardDescription from './ActiveCardDescription';
import ActiveCardActions from './ActiveCardActions';

const ActiveCardContent = () => {
	return (
		<div className="grid grid-rows-[1fr,auto] sm:grid-rows-none sm:grid-cols-[1fr,auto] gap-4">
			<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-5 gap-y-2">
				<ActiveCardDescription />
			</div>
			<div className="w-40 flex flex-col">
				<ActiveCardActions />
			</div>
		</div>
	);
};

export default ActiveCardContent;
