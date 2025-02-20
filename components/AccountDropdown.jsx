'use client';
import React, { useState, useEffect, useRef } from 'react';

const AccountDropdown = ({ user, logOut }) => {
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (buttonRef.current?.contains(event.target)) {
				return;
			}

			if (!dropdownRef?.current?.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setIsOpen]);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<div className="h-full p-0.5">
				<div
					ref={buttonRef}
					onClick={toggleDropdown}
					className="hover:bg-opacity-80 hover:cursor-pointer font-copy flex justify-center items-center h-full aspect-square rounded-full bg-blue-700 text-white text-sm"
				>
					{user.email.charAt(0)}
				</div>
			</div>

			{isOpen && (
				<div
					ref={dropdownRef}
					className="absolute min-w-fit w-[304px] z-50 top-12 bg-white border border-gray-200 rounded drop-shadow-2xl shadow-lg"
				>
					<div className="p-4 flex flex-col gap-3">
						<span className="font-copy text-xs uppercase font-bold">
							Account
						</span>
						<div className="h-10 flex gap-2">
							<div className="h-full aspect-square bg-blue-700 flex justify-center items-center rounded-full">
								<span className="text-white font-copy">
									{user.email.charAt(0)}
								</span>
							</div>
							<div className="flex flex-col justify-center">
								<span className="text-xs font-copy">
									{user.email}
								</span>
							</div>
						</div>
					</div>

					<div className="border-b-[1px] border-gray-200 my-1"></div>
					<div className="font-copy text-sm flex flex-col gap-3">
						<div
							onClick={logOut}
							className="hover:cursor-pointer hover:text-blue-600 hover:bg-blue-100 h-11 flex justify-start items-center p-4"
						>
							<span className="">Log out</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AccountDropdown;
