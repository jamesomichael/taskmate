import React, { useState, useEffect, useRef } from 'react';

const ContextMenu = ({ position, actions, onClose }) => {
	const contextMenuRef = useRef(null);
	const [menuPosition, setMenuPosition] = useState({
		x: position.x,
		y: position.y,
	});

	useEffect(() => {
		const adjustPosition = () => {
			const menuWidth = 150;
			const menuHeight = actions.length * 40;
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			let updatedX = position.x;
			let updatedY = position.y;

			if (position.x + menuWidth > screenWidth) {
				updatedX = screenWidth - menuWidth - 10;
			}

			if (position.y + menuHeight > screenHeight) {
				updatedY = screenHeight - menuHeight - 10;
			}

			setMenuPosition({ x: updatedX, y: updatedY });
		};

		adjustPosition();
	}, [position, actions.length]);

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
				top: menuPosition.y,
				left: menuPosition.x,
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
