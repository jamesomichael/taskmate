import React from 'react';

const ActiveCardAction = ({ icon: Icon, label, onClick, className = '' }) => {
	return (
		<div
			onClick={onClick}
			className={`flex gap-2 items-center font-medium text-sm font-copy w-full p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded ${className}`}
		>
			{Icon && <Icon size={15} />}
			<span>{label}</span>
		</div>
	);
};

export default ActiveCardAction;
