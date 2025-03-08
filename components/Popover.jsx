import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Popover = ({ children, trigger, className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const popoverRef = useRef(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const togglePopover = () => {
		if (!isOpen) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPosition({ x: rect.left, y: rect.bottom + window.scrollY });
		}
		setIsOpen((prev) => !prev);
	};

	const handleClickOutside = (e) => {
		if (
			popoverRef.current &&
			!popoverRef.current.contains(e.target) &&
			triggerRef.current &&
			!triggerRef.current.contains(e.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<>
			<div
				ref={triggerRef}
				onClick={togglePopover}
				className="cursor-pointer"
			>
				{trigger}
			</div>

			{isOpen &&
				createPortal(
					<div
						ref={popoverRef}
						className={`absolute z-50 bg-white shadow-xl rounded py-2 border border-gray-300 ${className}`}
						style={{ top: position.y, left: position.x }}
					>
						{children}
					</div>,
					document.body
				)}
		</>
	);
};

export default Popover;
