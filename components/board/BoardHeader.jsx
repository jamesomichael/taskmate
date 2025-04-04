import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import HeaderInput from '../shared/HeaderInput';
import ConfirmModal from '../shared/ConfirmModal';

import { FaRegStar, FaStar, FaRegTrashCan } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const BoardHeader = ({ id, isStarred, name }) => {
	const router = useRouter();
	const { updateBoard, deleteBoard } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(id, { is_starred: !isStarred });
	};

	const saveName = async (updatedName) => {
		await updateBoard(id, { name: updatedName });
	};

	const handleBoardDeletion = async () => {
		await deleteBoard(id);
		router.push('/');
	};

	return (
		<div className="h-14 bg-black bg-opacity-45 flex gap-4 items-center px-4 py-3">
			<HeaderInput
				value={name}
				onSave={saveName}
				className="truncate w-40 sm:w-fit px-2 h-full font-copy font-semibold text-white text-lg bg-transparent hover:cursor-pointer hover:bg-white hover:bg-opacity-25 focus:text-black focus:bg-white rounded"
			/>
			<div
				onClick={toggleStarredStatus}
				className="h-full aspect-square rounded flex justify-center items-center text-yellow-400 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer text-sm"
			>
				{isStarred ? <FaStar /> : <FaRegStar className="text-white" />}
			</div>
			<div
				title="Delete Board"
				className="ml-auto h-full aspect-square rounded flex justify-center items-center hover:bg-red-700 hover:cursor-pointer text-sm"
				onClick={() => setIsModalOpen(true)}
			>
				<FaRegTrashCan className="text-white" />
			</div>

			<ConfirmModal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleBoardDeletion}
				confirmationButtonText="Delete Board"
			>
				<span className="font-copy">
					<span className="font-semibold">"{name}"</span> and all its
					contents will be permanently deleted. This action cannot be
					undone.
				</span>
			</ConfirmModal>
		</div>
	);
};

export default BoardHeader;
