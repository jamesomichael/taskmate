import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ position, actions, onClose }) => {
	const contextMenuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target)
			) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={contextMenuRef}
			className="absolute z-10 bg-white border shadow-md rounded mt-2"
			style={{
				top: position.y,
				left: position.x,
			}}
		>
			<ul className="p-2">
				{actions.map((action, index) => (
					<li
						key={index}
						onClick={() => {
							action.onClick();
							onClose();
						}}
						className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
					>
						{action.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContextMenu;
