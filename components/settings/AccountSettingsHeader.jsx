import React from 'react';
import dayjs from 'dayjs';

const AccountSettingsHeader = ({ displayName, createdAt }) => {
	return (
		<div className="px-8 py-6 flex items-center gap-3 sm:gap-4 bg-slate-8000 w-full h-24 sm:h-36">
			<div className="flex justify-center items-center bg-blue-700 h-full aspect-square rounded-full">
				<span className="text-white font-copy text-xl sm:text-4xl">
					{displayName?.charAt(0)}
				</span>
			</div>
			<div className="flex flex-col sm:gap-1.5 w-full truncate">
				<span className="text-black font-heading font-bold text-2xl sm:text-4xl truncate">
					{displayName}
				</span>
				<span className="truncate font-copy text-xs sm:text-sm font-medium text-gray-800">
					Account created on&nbsp;
					<span className="font-semibold">
						{dayjs(createdAt).format('MMMM D, YYYY')}
					</span>
				</span>
			</div>
		</div>
	);
};

export default AccountSettingsHeader;
