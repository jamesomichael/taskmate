import React, { useState } from 'react';

import Modal from './Modal';

const CreateBoard = ({ isModalOpen, setIsModalOpen, onCreate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [boardName, setBoardName] = useState('My Board');

	const handleNameChange = (e) => {
		setBoardName(e.target.value);
	};

	const handleCreation = async () => {
		setIsLoading(true);
		await onCreate(boardName);
		setIsLoading(false);
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
			<div className="p-4">
				{isLoading ? (
					<>Loading...</>
				) : (
					<>
						<h2 className="text-lg font-bold">
							Create a New Board
						</h2>
						<input
							type="text"
							placeholder={boardName}
							onChange={handleNameChange}
							className="w-full p-2 border rounded mt-2"
						/>
						<button
							className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
							onClick={handleCreation}
						>
							Create
						</button>
					</>
				)}
			</div>
		</Modal>
	);
};

export default CreateBoard;
