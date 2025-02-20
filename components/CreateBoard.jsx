import React, { useState, useEffect, useRef } from 'react';

import Modal from './Modal';

import { FaCheck } from 'react-icons/fa6';

const boardBackgrounds = [
	'from-blue-100 to-blue-200',
	'from-blue-500 to-teal-500',
	'from-blue-800 to-blue-950',
	'from-purple-900 to-orange-800',
	'from-indigo-500 to-pink-500',
	'from-orange-600 to-yellow-500',
];

const CreateBoard = ({ isModalOpen, setIsModalOpen, onCreate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [boardName, setBoardName] = useState('My Board');
	const [selectedBackground, setSelectedBackground] = useState(
		boardBackgrounds[0]
	);

	const inputRef = useRef(null);

	useEffect(() => {
		if (isModalOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isModalOpen]);

	const handleNameChange = (e) => {
		setBoardName(e.target.value);
	};

	const handleCreation = async () => {
		setIsLoading(true);
		await onCreate(boardName, selectedBackground);
		setIsLoading(false);
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
			<div className="flex flex-col gap-4 items-center">
				{isLoading ? (
					<>Loading...</>
				) : (
					<>
						<span className="font-copy font-bold text-black">
							Create board
						</span>
						<div
							className={`p-2 bg-gradient-to-br ${selectedBackground} w-fit h-fit m-auto rounded`}
						>
							<img src="/board.svg" alt="" />
						</div>
						<div className="w-full flex flex-col gap-6 mt-4">
							<div className="flex flex-col gap-1.5">
								<span className="font-copy text-xs text-neutral-800 font-bold">
									Background
								</span>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
									{boardBackgrounds.map((background, i) => (
										<div
											key={i}
											onClick={() =>
												setSelectedBackground(
													background
												)
											}
											className={`hover:cursor-pointer h-20 rounded bg-gradient-to-br ${background}`}
										>
											{background ===
												selectedBackground && (
												<div className="flex justify-center items-center text-white w-full h-full rounded inset-0 bg-black bg-opacity-50">
													<FaCheck />
												</div>
											)}
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-1.5">
								<span className="font-copy text-xs text-neutral-800 font-bold">
									Board name
								</span>
								<input
									ref={inputRef}
									type="text"
									placeholder={boardName}
									onChange={handleNameChange}
									className="text-black w-full h-10 p-2 font-copy text-sm border rounded outline outline-[1px] placeholder-gray-500 outline-gray-500 focus:outline-blue-500 focus:outline-2"
								/>
							</div>
							<button
								className="font-copy w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm h-10 font-medium"
								onClick={handleCreation}
							>
								Create
							</button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
};

export default CreateBoard;
