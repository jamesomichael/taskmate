'use client';
import React, { useState } from 'react';

const AccountDropdown = ({ user, logOut }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="h-full p-0.5">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="hover:bg-opacity-80 hover:cursor-pointer font-copy flex justify-center items-center h-full aspect-square rounded-full bg-blue-700 text-white text-sm"
				>
					{user.email.charAt(0)}
				</div>
			</div>

			{isOpen && (
				<div className="absolute min-w-fit w-[304px] top-12 bg-white border border-gray-200 rounded drop-shadow-2xl shadow-lg p-2">
					<div className="p-3 flex flex-col gap-3">
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

					<div className="border-b-[1px] border-gray-200 my-2"></div>
					<div className="font-copy text-sm flex flex-col gap-3">
						<div
							onClick={logOut}
							className="rounded hover:cursor-pointer hover:text-blue-600 hover:bg-blue-100 h-12 flex justify-start items-center p-3"
						>
							<span className="">Log out</span>
						</div>
					</div>
					{/* <ul className="py-1">
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100"
							>
								Option 1
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100"
							>
								Option 2
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100"
							>
								Option 3
							</a>
						</li>
					</ul> */}
				</div>
			)}
		</>
	);
};

export default AccountDropdown;
