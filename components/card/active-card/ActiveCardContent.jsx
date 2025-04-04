import React from 'react';

import ActiveCardDescription from './ActiveCardDescription';
import ActiveCardActions from './ActiveCardActions';
import ActiveCardComments from './ActiveCardComments';
import ActiveCardTimestamps from './ActiveCardTimestamps';

const ActiveCardContent = () => {
	return (
		<div className="grid grid-rows-[1fr,auto] md:grid-rows-none md:grid-cols-[1fr,auto] gap-8 md:gap-4">
			<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-6 gap-y-3">
				<ActiveCardDescription />
				<ActiveCardComments />
			</div>
			<div className="w-full md:w-44 flex flex-col md:items-start items-center gap-4 md:gap-6">
				<ActiveCardActions />
				<ActiveCardTimestamps />
			</div>
		</div>
	);
};

export default ActiveCardContent;
