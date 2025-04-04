import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ContextMenu = ({ trigger, actions }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const contextMenuRef = useRef(null);

	const handleRightClick = (e) => {
		e.preventDefault();
		setIsOpen(true);
		setPosition({ x: e.clientX, y: e.clientY });
	};

	const handleClickOutside = (event) => {
		if (
			contextMenuRef.current &&
			!contextMenuRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div onContextMenu={handleRightClick} className="relative">
			{trigger}

			{isOpen &&
				createPortal(
					<div
						ref={contextMenuRef}
						className="fixed z-[10000] bg-white border shadow-xl rounded w-40"
						style={{ top: position.y, left: position.x }}
					>
						<div className="flex flex-col">
							{[
								...actions,
								{
									label: 'Cancel',
									onClick: () => setIsOpen(false),
								},
							].map((action, index) => (
								<span
									key={index}
									onClick={() => {
										action.onClick();
										setIsOpen(false);
									}}
									className="h-10 flex items-center px-3 hover:bg-blue-100 font-copy text-sm hover:text-blue-600 cursor-pointer"
								>
									{action.label}
								</span>
							))}
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default ContextMenu;
